# FROM node:8-alpine
# RUN apk --no-cache add --virtual native-deps \
#   g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
#   npm install --quiet node-gyp -g
# WORKDIR /app
# COPY package.json /app
# RUN yarn
# COPY ./dist/. /app
# CMD DEBUG=app node index.js
# EXPOSE 5000
# FROM node:10-alpine
FROM node:12.18.3-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json /home/node/app

USER node

RUN yarn

COPY dist/ /home/node/app
COPY wait-for.sh /home/node/app

EXPOSE 5000

CMD [ "node", "index.js" ]