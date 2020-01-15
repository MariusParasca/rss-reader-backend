FROM node:12.13-alpine

WORKDIR /app
COPY package.json /app

RUN npm install

COPY . /app

CMD npm start

EXPOSE 2001
