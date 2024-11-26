# Flatbacks website Kubernetes Kustomize overlay configuration

Declarative management of Flatbacks website Kubernetes resources using Kustomize.

## How to use

Within each overlay directory, create a `.env` file to contain required secret
values in the format KEY=value (e.g. `overlays/uat/.env`). Example:

    TZ=Australia/Perth
    SALT_HASH=SaltValue
    DATABASE_NAME=database_name
    DATABASE_USERNAME=usernamer
    DATABASE_PASSWORD=password
    DATABASE_HOST=mysql.host
    DATABASE_PORT=3306
    REDIS_HOST=redis.host
    REDIS_PORT=6379

See the main project `README` for all required values.

In addition, create a `settings.php` file in the same location having the required
Drupal project configuration (e.g. `overlays/uat/settings.php`). This file is
included in the project `.gitignore` files as it may contain sensitive information.

Run `kubectl` with the `-k` flag to generate resources for a given overlay.
For example, to manage the UAT overlay:

```bash
# Use a dry run for error-checking:
kubectl apply -k kustomize/overlays/uat --namespace flatbacks --dry-run=client
# Apply the overlay to a cluster:
kubectl apply -k kustomize/overlays/uat --namespace flatbacks
```

## References

- <https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/>
- <https://github.com/kubernetes-sigs/kustomize>
- <https://github.com/kubernetes-sigs/kustomize/tree/master/examples>
