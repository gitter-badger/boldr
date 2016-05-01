FROM strues/node:latest
WORKDIR /usr/src

COPY package.json package.json

RUN npm install --production

COPY . .

EXPOSE 3000

# These images have `node` already set as the entrypoint
# So you don't need to specify it in the CMD.
# The following will execute `node server.js` when you
# run the container.
CMD ["server.js"]
