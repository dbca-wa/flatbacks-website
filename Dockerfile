# syntax=docker/dockerfile:1
FROM drupal:10.3-php8.3-apache
LABEL org.opencontainers.image.authors=asi@dbca.wa.gov.au
LABEL org.opencontainers.image.source=https://github.com/dbca-wa/flatbacks-website

# Install project dependencies
WORKDIR /opt/drupal
COPY composer.json composer.lock ./
RUN composer install --no-dev

# Copy customised elements into site
COPY web/libraries ./web/libraries
COPY web/modules/custom ./web/modules/custom
COPY web/sites/maps ./web/sites/maps
COPY web/themes/custom ./web/themes/custom

# Run as the non-root user
USER www-data
