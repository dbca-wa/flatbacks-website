# docker-bake.hcl — reproducible, multi-arch build config.
# Build (local, native platform, tagged :dev):  docker buildx bake local
# Build + push (multi-arch):                    docker buildx bake --push app
#                                                (needs a docker-container builder)
# Override variables at build time:             LOCAL_TAG=local IMAGE=ghcr.io/me/project docker buildx bake local
# Multi-arch with overrides:                    IMAGE=ghcr.io/me/project PLATFORMS=linux/arm64 docker buildx bake --push app
#                                               TAG=experiment docker buildx bake --push app
# Override a Dockerfile ARG:                    docker buildx bake --set app.args.PHP_VERSION=8.5
# GitHub CI builds the "ci" target once per architecture, on a native runner
# (see .github/workflows/multi-build.yml).

variable "IMAGE" {
  description = "Fully-qualified image name, without the tag."
  default     = "ghcr.io/dbca-wa/flatbacks-website"
}

variable "TAG" {
  description = "Tag applied by the app/ci build targets."
  default     = "latest"
}

variable "LOCAL_TAG" {
  description = "Tag for a local development image."
  default     = "dev"
}

variable "PLATFORMS" {
  description = "Platforms used by the multi-arch targets."
  type        = list(string)
  default     = ["linux/amd64", "linux/arm64"]
}

variable "CACHE_SCOPE" {
  description = "GitHub Actions cache scope for the ci target. CI sets one per architecture so the two per-platform builds keep separate cache entries."
  default     = "flatbacks"
}

group "default" {
  targets = ["app"]
}

# What to build. Exporter, cache and attestation policy belong to the targets
# that consume this, so local builds don't inherit CI-only behaviour.
target "_base" {
  context    = "."
  dockerfile = "Dockerfile"
}

# Local development: native platform, loaded into Docker, tagged :dev (default).
# No `platforms`: BuildKit builds for the builder's host platform,
# so the image always matches the machine running the build.
target "local" {
  inherits = ["_base"]
  tags     = ["${IMAGE}:${LOCAL_TAG}"]
  output   = ["type=docker"]
}

# Multi-arch image for the registry (manual release build & push or CI).
# Push-only target.
target "app" {
  inherits  = ["_base"]
  tags      = ["${IMAGE}:${TAG}"]
  platforms = PLATFORMS
  # Provenance + SBOM; attached on push (CI needs attestations + id-token permissions).
  attest    = ["type=provenance,mode=max", "type=sbom"]
}

# CI-only: one platform per run (see multi-build.yml), pushed as a per-arch
# staging tag that the workflow merges into the final multi-arch manifest.
# Always refresh base images so any scheduled rebuild picks up upstream
# security fixes, and cache layers via GitHub Actions cache so an unchanged
# apt/pecl/composer chain is restored instead of rebuilt.
# Note that CI overrides tag, platform and cache scope in multi-build.yml via
# set: ci.tags=... / set: ci.platforms=... and the CACHE_SCOPE variable.
target "ci" {
  inherits   = ["app"]
  # Scoped per architecture: the two matrix jobs must not share cache entries.
  # ignore-error means a failed cache export degrades to a slower build instead
  # of failing a release.
  cache-from = ["type=gha,scope=${CACHE_SCOPE}"]
  cache-to   = ["type=gha,scope=${CACHE_SCOPE},mode=max,ignore-error=true"]
  pull       = true
}
