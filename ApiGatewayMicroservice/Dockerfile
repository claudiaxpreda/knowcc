FROM node:14-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN ["npm", "ci"]

COPY . .

CMD ["npm", "run", "start"]