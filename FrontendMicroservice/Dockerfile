# pull the base image
FROM node:14-alpine

# set the working direction
WORKDIR /usr/src/frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]