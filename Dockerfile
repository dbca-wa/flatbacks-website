# syntax=docker/dockerfile:1
# Args to centralise versions.
ARG DRUPAL_VERSION=11.4
ARG PHP_VERSION=8.4
# Upstream nginx (nginx.org stable), not trixie's 1.26.x. Bump both by hand:
# Dependabot tracks the Dockerfile FROM tags, not a third-party apt repository.
# NGINX_PKG_RELEASE is the Debian suite in the package version
# (1.30.7-1~trixie) and must move with the base image's distro.
ARG NGINX_VERSION=1.30.8
ARG NGINX_PKG_RELEASE=1~trixie

# Note that there is no DHI Drupal image available.
#
# The base image is referenced by tag only, not tag+digest, and that is
# deliberate: the upstream 11.4.x tag is where PHP security fixes arrive, and
# both the weekly scheduled CI rebuild (docker-bake.hcl target "ci", which sets
# pull = true) and `.github/dependabot.yml` (docker ecosystem) keep it current.
# A digest pin would freeze those patches until someone hand-edits the hash. If
# Dependabot cannot parse the composite
# `${DRUPAL_VERSION}-php${PHP_VERSION}-fpm-trixie` tag, bump DRUPAL_VERSION here
# by hand; re-resolve a digest with `docker buildx imagetools inspect
# drupal:<tag>` if you ever do need to freeze one.
#
# The FPM variant ships php-fpm only (no Apache). nginx is installed below from
# nginx.org and runs as a second container in the pod, sharing the pod network
# namespace and the same docroot, and proxying to php-fpm on 127.0.0.1:9000. The
# default CMD stays php-fpm; the nginx container overrides it with
# `nginx -g 'daemon off;'`.
FROM drupal:${DRUPAL_VERSION}-php${PHP_VERSION}-fpm-trixie
# Global ARGs are only in scope for FROM; re-declare the ones used in RUN.
ARG NGINX_VERSION
ARG NGINX_PKG_RELEASE
LABEL org.opencontainers.image.title="flatbacks-website" \
  org.opencontainers.image.description="North West Shelf Flatback Turtles Conservation Program public website" \
  org.opencontainers.image.source="https://github.com/dbca-wa/flatbacks-website" \
  org.opencontainers.image.vendor="DBCA" \
  org.opencontainers.image.authors="asi@dbca.wa.gov.au" \
  org.opencontainers.image.licenses="GPL-3.0-only"

# nginx.org signing key. Pinned by checksum so a rotated or tampered key fails
# the build loudly instead of silently changing apt's trust root; update the
# hash if nginx.org ever rotates it. ASCII-armoured keys work with apt's
# signed-by on trixie, so gnupg is not needed in the image.
ADD --checksum=sha256:55385da31d198fa6a5012d40ae98ecb272a6c4e8fffffba94719ffd3e87de37a \
  --chmod=0644 \
  https://nginx.org/keys/nginx_signing.key \
  /etc/apt/keyrings/nginx-archive-keyring.asc

# Install system dependencies and PHP extensions. nginx comes from nginx.org
# (trixie only ships 1.26.x) so the webserver sidecar runs from the same image
# as php-fpm and serves exactly the same docroot. Upstream nginx's compiled-in
# temp paths point at /var/cache/nginx, but the pod uses a read-only root
# filesystem, so docker/nginx/nginx.conf redirects every temp path to /tmp and
# the package's log files are replaced with symlinks to the container streams.
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked <<EOF
  export DEBIAN_FRONTEND=noninteractive
  set -euxo pipefail
  echo 'deb [signed-by=/etc/apt/keyrings/nginx-archive-keyring.asc] https://nginx.org/packages/debian trixie nginx' > /etc/apt/sources.list.d/nginx.list
  apt-get update -q
  apt-get install -y --no-install-recommends \
    default-mysql-client "nginx=${NGINX_VERSION}-${NGINX_PKG_RELEASE}"
  # The image never starts nginx through systemd/init, and the packaged default
  # site (port 80) is replaced by docker/nginx/nginx.conf. Drop the service
  # plumbing and debug binary, but keep the dpkg entry so vulnerability scans
  # and SBOMs still see nginx.
  rm -f /etc/nginx/conf.d/default.conf /etc/init.d/nginx /etc/init.d/nginx-debug \
    /etc/default/nginx /etc/default/nginx-debug \
    /usr/lib/systemd/system/nginx.service /usr/lib/systemd/system/nginx-debug.service \
    /etc/logrotate.d/nginx /usr/sbin/nginx-debug
  # nginx opens its compiled-in default error log before parsing our config, so
  # point both log files at the container streams (the rootfs is read-only).
  rm -f /var/log/nginx/*.log
  ln -s /dev/stdout /var/log/nginx/access.log
  ln -s /dev/stderr /var/log/nginx/error.log
  pecl install apcu uploadprogress
  docker-php-ext-enable apcu uploadprogress
  printf 'apc.enable_cli=1\napc.shm_size=64M\n' > /usr/local/etc/php/conf.d/apcu.ini
  rm -rf /tmp/pear /tmp/* /var/tmp/*
EOF

# nginx configuration for the webserver sidecar (non-root, port 8080,
# FastCGI to php-fpm on 127.0.0.1:9000).
COPY --link docker/nginx/nginx.conf /etc/nginx/nginx.conf
# php-fpm pool configuration (tuning) and health endpoint for the pod's
# readiness probe (via nginx).
COPY --link docker/php-fpm/ /usr/local/etc/php-fpm.d/

# Install project dependencies. The Composer download cache is a build cache
# mount, so the ~150 MB of dists it fetches never land in the image layer.
WORKDIR /opt/drupal
COPY --link --chown=33:33 composer.json composer.lock ./
RUN --mount=type=cache,target=/tmp/composer-cache \
  COMPOSER_CACHE_DIR=/tmp/composer-cache \
  composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --quiet

# Copy external downloaded plugin files into site
COPY --link --chown=33:33 web/libraries ./web/libraries
# Copy customised elements into site
COPY --link --chown=33:33 web/modules/custom ./web/modules/custom
COPY --link --chown=33:33 web/sites/maps ./web/sites/maps
COPY --link --chown=33:33 web/themes/custom ./web/themes/custom

USER 33:33
# 9000: php-fpm (pod-internal), 8080: nginx (Service/ingress target).
EXPOSE 9000 8080
