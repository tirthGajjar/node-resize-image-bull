FROM node:12.8.0-alpine

WORKDIR /app

COPY ./package.json package.json
COPY ./package-lock.json package-lock.json

RUN npm install

COPY ./.env .env
COPY ./nodemon.json nodemon.json
COPY ./app ./app

EXPOSE 3001

CMD ["nodemon", "./app/index.js"]
