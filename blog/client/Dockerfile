FROM node:current-alpine3.16

ENV NODE_OPTIONS="--openssl-legacy-provider"
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]
