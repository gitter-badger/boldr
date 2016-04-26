# PostgreSQL with replication support

Docker image for PostgreSQL with replication support and ZODB RelStorage ready

This image is generic, thus you can obviously re-use it whereever

## Installation

1. Install [Docker](https://www.docker.com/).

2. Install [Docker Compose](https://docs.docker.com/compose/).

## Simple usage

    $ docker run --name=pg1 \
                 -e POSTGRES_USER=postgres \
                 -e POSTGRES_PASSWORD=postgres \
                 -e POSTGRES_DBNAME=dbname \
                 -e POSTGRES_DBUSER=dbname \
                 -e POSTGRES_DBPASS=dbname \
             strues/postgres

Or using docker-compose:

    postgres:
      image: strues/postgres:9.5
      ports:
      - "5432:5432"
      environment:
        POSTGRES_USER: postgres
        POSTGRES_PASSWORD: postgres
        POSTGRES_DBNAME: dbname
        POSTGRES_DBUSER: zope
        POSTGRES_DBPASS: dbname
      volumes:
      - postgres_data:/var/lib/postgresql/data

## PostgreSQL replication

Start master node:

    $ docker run --name=master \
                 -e POSTGRES_USER=postgres \
                 -e POSTGRES_PASSWORD=postgres \
                 -e POSTGRES_DBNAME=dbname \
                 -e POSTGRES_DBUSER=dbname \
                 -e POSTGRES_DBPASS=dbname \
                 -e POSTGRES_CONFIG_wal_level=hot_standby \
                 -e POSTGRES_CONFIG_max_wal_senders=8 \
                 -e POSTGRES_CONFIG_wal_keep_segments=8 \
                 -e POSTGRES_CONFIG_hot_standby=on \
            strues/postgres

Start replica:

    $ docker run --name=replica1 \
                 --link=master \
                 -e POSTGRES_REPLICATE_FROM=master \
                 -e POSTGRES_USER=postgres \
                 -e POSTGRES_PASSWORD=postgres \
                 -e POSTGRES_CONFIG_wal_level=hot_standby \
                 -e POSTGRES_CONFIG_max_wal_senders=8 \
                 -e POSTGRES_CONFIG_wal_keep_segments=8 \
                 -e POSTGRES_CONFIG_hot_standby=on \
        strues/postgres

or using docker-compose:

    master:
      image: strues/postgres
      environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DBNAME=dbname
      - POSTGRES_DBUSER=dbname
      - POSTGRES_DBPASS=dbname
      - POSTGRES_CONFIG_wal_level=hot_standby
      - POSTGRES_CONFIG_max_wal_senders=8
      - POSTGRES_CONFIG_wal_keep_segments=8
      - POSTGRES_CONFIG_hot_standby=on
      volumes:
      - master_data:/var/lib/postgresql/data

    replica:
      image: strues/postgres
      tty: true
      stdin_open: true
      links:
      - master
      environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_CONFIG_wal_level=hot_standby
      - POSTGRES_CONFIG_max_wal_senders=8
      - POSTGRES_CONFIG_wal_keep_segments=8
      - POSTGRES_CONFIG_hot_standby=on
      - POSTGRES_REPLICATE_FROM=master
      volumes:
      - replica_data:/var/lib/postgresql/data

Customize your deployment by changing environment variables.
See [Supported environment variables](#env) section bellow.

**You may want to restore existing PostgreSQL database**,
within data container. See section [Restore existing database](#restore)


## Persistent data as you wish
The PostgreSQL database is kept in a
[data-only container](https://medium.com/@ramangupta/why-docker-data-containers-are-good-589b3c6c749e)
named *data*. The data container keeps the persistent data for a production environment and
[must be backed up](https://github.com/paimpozhil/docker-volume-backup).

So if you are running in a development environment, you can skip the backup and delete
the container if you want.

On a production environment you would probably want to backup the container at regular intervals.
The data container can also be easily
[copied, moved and be reused between different environments](https://docs.docker.com/userguide/dockervolumes/#backup-restore-or-migrate-data-volumes).


<a name="restore"></a>
## Restore existing database


### Extract PostgreSQL database from the container

    $ cd dbname
    $ docker-compose up -d
    $ docker exec -it postgres_postgres_1 \
      sh -c "pg_dump -U dbname | gzip > /postgresql.backup/datafs.gz"
    $ ls backup/

### Restore PostgreSQL database from backup

**WARNING:**

- **NEVER do this directly on PRODUCTION**
- Make sure you're restoring your backup within **an empty PostgreSQL database**.
  For this you can either remove existing docker data container
  **docker-compose rm -v data**
  or manually add the database using createdb utility


      $ cd dbname
      $ cp /path/to/my/backups/datafs.gz backup/
      $ docker-compose up -d
      $ docker exec -it dbname \
        sh -c "gunzip -c /postgresql.backup/datafs.gz | psql -U dbname"


<a name="env"></a>
## Supported environment variables

* `POSTGRES_USER` This optional environment variable is used in conjunction
   with POSTGRES_PASSWORD to set a user and its password. This variable will
   create the specified user with superuser power and a database with the same name.
   If it is not specified, then the default user of `postgres` will be used.
* `POSTGRES_PASSWORD` This environment variable is recommend for you to use
  the PostgreSQL image. This environment variable sets the superuser password
  for PostgreSQL. The default superuser is defined by the POSTGRES_USER
  environment variable. Default `postgres`
* `POSTGRES_DBNAME` Create multiple databases (space separated) within PostgreSQL with `POSTGRES_DBUSER` as owner.
  E.g. POSTGRES_DBNAME=datafs zasync
* `POSTGRES_DBUSER` Owner for `POSTGRES_DBNAME`
* `POSTGRES_DBPASS` Password for `POSTGRES_DBUSER`
* `POSTGRES_REPLICATE_FROM` Start a PostgreSQL replica of the given master

You can also override postgres configuration via environment variables by using
`POSTGRES_CONFIG_` prefix. Example:

    POSTGRES_CONFIG_MAX_CONNECTIONS=200
    POSTGRES_CONFIG_SHARED_BUFFERS=4GB

See [PostgreSQL Documentation](http://www.postgresql.org/docs/9.5/static/runtime-config.html) for supported parameters.
You should also check [Tuning Your PostgreSQL Server](https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server)
