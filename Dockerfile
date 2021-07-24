FROM node:14-alpine

ENV PORT 3000

RUN mkdir -p /usr/src/sugma
WORKDIR /usr/src/sugma

COPY package*.json /usr/src/sugma/
RUN npm install

COPY . /usr/src/sugma

RUN npm run build
EXPOSE 3000

CMD [ "npm", "start" ]
