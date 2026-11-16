# syntax=docker/dockerfile:1
# Args to centralise versions.
ARG DRUPAL_VERSION=11.4
ARG PHP_VERSION=8.4

# Note that there is no DHI Drupal image available.
#
# The base image is referenced by tag only, not tag+digest, and that is
# deliberate: the upstream 11.4.x tag is where PHP and Apache security fixes
# arrive, and both the weekly scheduled CI rebuild (docker-bake.hcl target
# "ci", which sets pull = true) and `.github/dependabot.yml` (docker
# ecosystem) keep it current. A digest pin would freeze those patches until
# someone hand-edits the hash. If Dependabot cannot parse the composite
# `${DRUPAL_VERSION}-php${PHP_VERSION}-apache-trixie` tag, bump DRUPAL_VERSION
# here by hand; re-resolve a digest with `docker buildx imagetools inspect
# drupal:<tag>` if you ever do need to freeze one.
FROM drupal:${DRUPAL_VERSION}-php${PHP_VERSION}-apache-trixie
LABEL org.opencontainers.image.title="flatbacks-website" \
  org.opencontainers.image.description="North West Shelf Flatback Turtles Conservation Program public website" \
  org.opencontainers.image.source="https://github.com/dbca-wa/flatbacks-website" \
  org.opencontainers.image.vendor="DBCA" \
  org.opencontainers.image.authors="asi@dbca.wa.gov.au" \
  org.opencontainers.image.licenses="GPL-3.0-only"

# Install system dependencies and PHP extensions
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked <<EOF
  export DEBIAN_FRONTEND=noninteractive
  set -euxo pipefail
  apt-get update -q
  apt-get install -y --no-install-recommends default-mysql-client
  pecl install apcu uploadprogress
  docker-php-ext-enable apcu uploadprogress
  printf 'apc.enable_cli=1\napc.shm_size=64M\n' > /usr/local/etc/php/conf.d/apcu.ini
  rm -rf /tmp/pear /tmp/* /var/tmp/*
EOF

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
EXPOSE 8080
