FROM strues/node:latest
RUN mkdir -p /home/app
WORKDIR /home/app

COPY ./package.json /home/app/package.json
RUN npm install

COPY . /home/app

# Set development environment as default
ENV NODE_ENV development

EXPOSE 3000

# These images have `node` already set as the entrypoint
# So you don't need to specify it in the CMD.
# The following will execute `node server.js` when you
# run the container.
CMD npm run start
