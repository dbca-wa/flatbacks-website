# North West Shelf Flatback Turtles Conservation Program public website

This project contains project dependencies and custom elements for the DBCA
North West Shelf Flatback Turtles Conservation Program public website. The
website is developed using the Drupal content management system.

## Development

The project dependencies (including Drupal) are installed and managed using Composer.
Set up a local development environment like so:

1. Install and set up Composer and any local dependencies.
1. Clone the project locally.
1. Change into the project directory and install dependencies: `composer install`
1. Create a local configuration file at `web/sites/default/settings.php`
1. Develop and test the site as normal, taking care to commit any custom elements
   under `web/` into the project repository (while avoiding to commit "generic" elements).

## Docker image

To build a new Docker image from the `Dockerfile`:

    docker image build -t ghcr.io/dbca-wa/flatbacks-website .

## Docker Compose

Use the included Compose file to start the required services to serve the project.
Prerequisites:

1. Docker image is built (see above).
1. A local `settings.php` should be generated containing site configuration.
1. Local `.env.mysql` and `.env.flatbacks` files should be created, containing secrets.
1. Start services: `docker compose up`
1. After Docker volumes are generated, copy the contents of `web` and `web/sites/default/files`
   into the relevant Docker volumes so that the Nginx container can serve those files.

`.env.mysql` example:

    TZ=Australia/Perth
    MARIADB_ROOT_PASSWORD=database_root_password

`.env.flatbacks` example:

    TZ=Australia/Perth
    SALT_HASH=LongSaltValue
    DATABASE_NAME=database_name
    DATABASE_USERNAME=database_username
    DATABASE_PASSWORD=database_password
    DATABASE_HOST=mysql11
    DATABASE_PORT=3306
    REDIS_HOST=redis
    REDIS_PORT=6379
