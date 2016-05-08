FROM strues/base
MAINTAINER Steven Truesdell <steven@strues.io>

ENV RETHINKDB_PACKAGE_VERSION 2.3.2~0jessie
RUN \
    apt-key adv --keyserver pgp.mit.edu --recv-keys 1614552E5765227AEC39EFCFA7E00EF33A8F2399 \
    && echo "deb http://download.rethinkdb.com/apt jessie main" > /etc/apt/sources.list.d/rethinkdb.list \
    && apt-get update \
    && apt-get install -yq --no-install-recommends rethinkdb=$RETHINKDB_PACKAGE_VERSION \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


VOLUME ["/data"]
WORKDIR /data

EXPOSE 8080 28015 29015

CMD ["rethinkdb", "--bind", "all"]
