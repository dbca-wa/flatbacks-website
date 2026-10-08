# AGENTS.md — Flatbacks Website

Drupal 10.6 public site (PHP 8.4, Composer-managed). DBCA North West Shelf Flatback Turtles Conservation Program.

## Repository layout & where to put code

- `web/core`, `web/modules/contrib`, `web/themes/contrib`, `web/profiles/contrib` are **Composer-managed and gitignored**. Never edit them directly — changes are wiped on `composer install`. Add or update a module with `composer require drupal/<name>`.
- Custom code lives in:
  - `web/modules/custom/` — `nws_misc` (interactive maps + Views filter chips + form UX), `emoji_sanitizer`, `remove_generator`
  - `web/themes/custom/nws` — custom theme built on Barik (see `web/themes/custom/nws/README.txt`)
  - `web/sites/maps/` — static HTML/JS map microsites (`australian-turtles`, `flatback-turtles`, `monitoring`, `traditional-custodians`), baked into the image via the Dockerfile
- `web/sites/default` is the live Drupal site; its `settings.php`, `services*.yml`, and `files/` are gitignored.

## Configuration is environment-driven

- `settings.php` (repo-root `settings.php` for local dev) reads DB, `SALT_HASH`, and Redis **entirely from env vars** (`DATABASE_*`, `REDIS_*`, `SALT_HASH`). No committed secrets and no `settings.local.php` include.
- Local dev: create root `settings.php` + `.env.flatbacks` + `.env.mysql` (gitignored; copy examples from `kustomize/overlays/*`). Prod/UAT pull the same values from kustomize overlay secrets.
- In dev all caches are forced to `cache.backend.null` (render / page / dynamic_page_cache) — caching is off locally.
- Site configuration lives in the database and the gitignored `web/sites/default/files/config_*/sync` directory, **not in version control**. Change config through the Drupal admin UI / config export, not by editing tracked files.

## Build & run

- Install deps: `composer install` (scaffolds `web/core` etc. via composer/installers).
- Docker image: `docker image build -t ghcr.io/dbca-wa/flatbacks-website .` — the Dockerfile copies **only** `web/libraries`, `web/modules/custom`, `web/sites/maps`, `web/themes/custom` plus runs `composer install`. Contrib/core come from Composer at build time, so custom changes must be committed to those dirs to ship.
- `docker compose up` (MySQL 8 + Valkey/Redis, app on :8080). Requires local `ports.conf`, `apache.conf`, `php-config.ini`, `settings.php` present — these are bind-mounted and have examples in `kustomize/overlays`.
- Deploy: `kubectl apply -k kustomize/overlays/<uat|prod> --namespace flatbacks` (see `kustomize/README.md`). Needs `.env`, `.azurestorageaccountsecret`, `dhi-registry-config.json`, `settings.php` in the overlay dir.

## Code style & static analysis

- PHP: php-cs-fixer with `@auto` rules (`.php-cs-fixer.dist.php`). Twig: twig-cs-fixer. Both leave a `.cache` file in the working tree (currently untracked, not in `.gitignore`); they regenerate on each run, so there's no need to commit them — add them to `.gitignore`. The binaries are NOT Composer-managed (not in require-dev); run them via a globally installed phar/CLI, not `vendor/bin`.
- PHPStan (`vendor/bin/phpstan`) runs against the project `phpstan.neon` (scans `web/modules/custom` + `web/themes/custom`; run with `--memory-limit=1G`). drupal-rector (`vendor/bin/rector`, require-dev) is available for Drupal 11 upgrade prep, but there is no project-level rector config — it relies on Drupal core's rules.
- **No PHPUnit tests and no lint/typecheck CI step.** CI (`.github/workflows/multi-build.yaml`) only builds multi-arch images and runs a Trivy scan on push to `main`/tags. Verification is manual.
- EditorConfig enforces 2-space indent (4 for `composer.json`/`composer.lock`).

## Conventions

- Commits are short, lowercase, imperative: `Update Drupal core to 10.6.16`, `Added emoji_sanitizer custom module`.
- `nws_misc` maps are provided by a single `MapBlock` plugin (id `nws_misc_map`) that hardcodes node 68 (configurable via the block's `node_id` setting) and recurses into `field_children_map` paragraphs — read `web/modules/custom/nws_misc/README.md` before changing map behaviour.
