# docker-bake.hcl — reproducible, multi-arch build config.
# Build (local single-platform):  docker buildx bake
# Build + push (multi-arch):      docker buildx bake --push
# Build local image:              docker buildx bake local
# Override at runtime:            TAG=v2 REGISTRY=ghcr.io/me docker buildx bake

variable "TAG" {
  default = "latest"
}

variable "REGISTRY" {
  default = "ghcr.io/dbca-wa"
}

variable "PLATFORMS" {
  default = "linux/amd64,linux/arm64"
}

group "default" {
  targets = ["app"]
}

target "app" {
  context    = "."
  dockerfile = "Dockerfile"
  tags       = ["${REGISTRY}/flatbacks-website:${TAG}"]
  platforms  = split(",", PLATFORMS)
  cache-from = ["type=gha"]
  cache-to   = ["type=gha,mode=max"]
  attest     = ["type=provenance,mode=max", "type=sbom"]
}

target "local" {
  inherits  = ["app"]
  platforms = ["linux/amd64"]
  attest    = ["type=provenance,disabled=true", "type=sbom,disabled=true"]
  output    = ["type=docker"]
}
