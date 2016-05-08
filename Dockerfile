FROM strues/node:latest
MAINTAINER Steven Truesdell <steven@strues.io>

ENV HOME /home/app
ENV NODE_ENV development
ENV PATH $HOME/node_modules/.bin:$PATH
WORKDIR $HOME

COPY package.json $HOME/package.json
RUN npm install

COPY . $HOME

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
