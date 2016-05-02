FROM postgres:9.5
MAINTAINER Steven Truesdell <steven@strues.io>

RUN mkdir -p /postgresql.conf.d \
 && mv /docker-entrypoint.sh /master-entrypoint.sh

COPY replica-entrypoint.sh /docker-entrypoint.sh /
COPY setup-env.py /bin/
COPY setup-*.sh /docker-entrypoint-initdb.d/
COPY default.conf /postgresql.conf.d/
