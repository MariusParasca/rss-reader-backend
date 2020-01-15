FROM node:12.13-alpine

WORKDIR /app_auto_fetch
COPY package.json /app_auto_fetch

RUN npm install

COPY . /app_auto_fetch

CMD npm start

EXPOSE 20202