FROM node:14-alpine

WORKDIR /usr/src/io

COPY package*.json ./

RUN ["npm", "ci"]

COPY . .

CMD ["npm", "run", "start"]