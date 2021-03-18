# Psulo frontend typescript test task

## How to set up backend

You should have docker installed to run the backend.

Open this directory in the terminal and run docker-compose:

```
docker-compose up
```

it will start the backend server and the database. Next, you will have to seed the database: run these commands to do so.

```
CONTAINER_NAME=$(docker ps -aqf "ancestor=postgres:12.1-alpine")
docker cp dump.dump $CONTAINER_NAME:/dump.dump
docker exec -it $CONTAINER_NAME pg_restore -c /dump.dump -d psulo-test-task-sample --user=postgres --no-owner
```

Backend is ready! Now you have to install frontend dependencies:

```
yarn
```

and start the development server

```
yarn start
```
