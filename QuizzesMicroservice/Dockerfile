FROM node:14-alpine

WORKDIR /usr/src/quizzes

COPY package*.json ./

RUN ["npm", "install"]

COPY . .

CMD ["npm", "run", "start"]