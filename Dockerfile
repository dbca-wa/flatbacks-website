FROM drupal:10.3-fpm

COPY vendor/ /opt/drupal/vendor/

USER www-data

