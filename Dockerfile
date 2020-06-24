FROM node:12 AS build

RUN mkdir -p /home/app
WORKDIR /home/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT node ./initialize && npm run start
