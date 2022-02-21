FROM node:14.18.1-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./

# EXPOSE 8080

CMD ["npm", "run", "start"]
