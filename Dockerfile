# syntax=docker/dockerfile:1
FROM drupal:10.5-php8.3-apache
LABEL org.opencontainers.image.authors=asi@dbca.wa.gov.au
LABEL org.opencontainers.image.source=https://github.com/dbca-wa/flatbacks-website

# Install system dependencies
RUN apt-get update -y \
  && apt-get upgrade -y \
  && apt-get install -y default-mysql-client \
  && rm -rf /var/lib/apt/lists/*

# Install PHP extension(s)
RUN pecl install apcu uploadprogress

# Install project dependencies
WORKDIR /opt/drupal
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Copy customised elements into site
COPY web/libraries ./web/libraries
COPY web/modules/custom ./web/modules/custom
COPY web/sites/maps ./web/sites/maps
COPY web/themes/custom ./web/themes/custom

# Run as the non-root user
USER www-data
