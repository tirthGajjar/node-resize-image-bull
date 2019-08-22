FROM ubuntu:18.04

RUN apt-get update && apt-get install -y libvips curl build-essential

RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

COPY ./package.json package.json
COPY ./package-lock.json package-lock.json

RUN npm install

COPY ./.env .env
COPY ./app ./app

RUN mkdir -p ./images/tmp
RUN mkdir -p ./images/resized

EXPOSE 3001

CMD ["nodemon", "./app/index.js"]
