# syntax=docker/dockerfile:1
FROM drupal:10.3-fpm
LABEL org.opencontainers.image.authors=asi@dbca.wa.gov.au
LABEL org.opencontainers.image.source=https://github.com/dbca-wa/flatbacks-website

WORKDIR /opt/drupal
# Install project dependencies
COPY composer.json composer.lock ./
RUN composer install

# Copy customised elements into site
COPY web/modules/custom/nws_misc ./web/modules/custom/nws_misc
COPY web/sites/maps ./web/sites/maps
COPY web/themes/custom/nws ../web/themes/custom/nws

# Run as the non-root user
USER www-data
