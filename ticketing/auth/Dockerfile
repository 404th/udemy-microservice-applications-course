FROM node:18.11.0-alpine

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]
