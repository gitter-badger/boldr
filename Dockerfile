FROM node:5.11-slim
RUN mkdir /src

RUN npm install -g nodemon

# Define working directory
ADD package.json /src/package.json
WORKDIR /src
RUN npm install

# Expose port
EXPOSE  3000

CMD ["npm", "start"]
