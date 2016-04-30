FROM node:5.11-slim
RUN mkdir /src

RUN npm install -g nodemon

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/
WORKDIR /src
RUN npm install

# Expose port
EXPOSE  3000

CMD ["npm", "start"]
