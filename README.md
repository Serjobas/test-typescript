### Psulo frontend typescript test task


# How to set up backend

```
CONTAINER_NAME=$(docker ps -aqf "ancestor=postgres:12.1-alpine")
docker cp dump.dump $CONTAINER_NAME:/dump.dump
docker exec -it $CONTAINER_NAME pg_restore -c /dump.dump -d psulo-test-task-sample --user=postgres --no-owner
```
