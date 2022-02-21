FROM node:14.18.1-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE 3002

CMD ["npm", "install", "@auth0/auth0-react"]
CMD ["npm", "start"]