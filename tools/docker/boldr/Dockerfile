FROM node:5.11-slim
RUN mkdir /src

RUN npm install -g nodemon

# Define working directory
WORKDIR /src
ADD ../../package.json /src/package.json
RUN npm install

# Expose port
EXPOSE  3000

CMD ["npm", "start"]
