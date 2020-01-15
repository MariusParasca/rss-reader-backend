# RSS reader

This is a rss aggregator that aggregates rss feeds

## Installation

- Install nodejs with npm: https://nodejs.org/en/

- Install a mysql database: https://www.mysql.com/

- Create a database using mysql and save the name of the database (we will use it later): https://dev.mysql.com/doc/refman/8.0/en/creating-database.html

- Edit the .env file using your credentials. Example of .env file:

```bash
PORT=2001
DATABASE_NAME=rss_aggregator
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_HOST=localhost
DATABASE_DIALECT=mysql
```

Steps to run the project:

- Step 1, go to the root directory of the project and run:

```bash
npm install
```

- Step 2, start the project:

```bash
npm start
```

## Docker

Build containers:

```bash
docker-compose up --build -d rss_aggregator_database
docker-compose up --build -d rss_aggregator_server
```

Get the IP of the container:

```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container-id
```

View container logs:

```bash
docker logs -f container-id
```
