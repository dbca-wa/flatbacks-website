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
1. Set up the required Drupal database and user.
1. Create a local configuration file at `web/sites/default/settings.php` (should be gitignored).
1. Develop and test the site as normal, taking care to commit any custom elements
   under `web/` into the project repository (while avoiding to commit "generic" elements).

## Docker image

To build a new Docker image from the `Dockerfile`:

    docker image build -t ghcr.io/dbca-wa/flatbacks-website .

## Docker Compose

Use the included Compose file to start the required services to serve the project.
Prerequisites:

1. Docker image is built (see above).
1. A local `ports.conf` and `default.conf` should be generated to configure Apache within
   the running container (examples are in the `kustomize\overlays` directory). These
   files will be bind-mounted in the container.
1. A local `settings.php` should be generated containing site configuration that will be
   bind-mounted at `web/sites/default/settings.php`.
1. Local `.env.mysql` and `.env.flatbacks` files should be created, containing secrets.
1. Start services: `docker compose up`
1. After Docker volume is generated, copy any local contents of `web/sites/default/files`
   into the relevant Docker volumes so that the webserver can serve those files.

`.env.mysql` example:

    TZ=Australia/Perth
    MARIADB_ROOT_PASSWORD=database_root_password

Example SQL commands to set up a new development database in the MariaDB container:

    mariadb -h localhost -u root -p
    CREATE USER 'flatbacks'@'%' IDENTIFIED BY 'flatbacks_password';
    CREATE DATABASE flatbacks_database;
    GRANT ALL PRIVILEGES ON flatbacks_database.* TO 'flatbacks'@'%' WITH GRANT OPTION;
    FLUSH PRIVILEGES;

`.env.flatbacks` example:

    TZ=Australia/Perth
    SALT_HASH=LongSaltValue
    DATABASE_USERNAME=flatbacks
    DATABASE_PASSWORD=flatbacks_password
    DATABASE_NAME=flatbacks_database
    DATABASE_HOST=mysql11
    DATABASE_PORT=3306
    REDIS_HOST=redis
    REDIS_PORT=6379
