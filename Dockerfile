# syntax=docker/dockerfile:1
FROM drupal:10.3-fpm
LABEL org.opencontainers.image.authors=asi@dbca.wa.gov.au
LABEL org.opencontainers.image.source=https://github.com/dbca-wa/flatbacks-website

COPY vendor/ /opt/drupal/vendor/
USER www-data
