FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./wait-for-it.sh .

RUN chmod +x ./wait-for-it.sh

CMD ["./wait-for-it.sh", "mysql:3306", "redis:6379","--", "npm", "run", "start"]