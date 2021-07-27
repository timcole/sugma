FROM node:14-alpine

ENV PORT 3000

RUN mkdir -p /usr/src/sugma
WORKDIR /usr/src/sugma

COPY package*.json /usr/src/sugma/
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate

COPY . /usr/src/sugma

RUN npm run build
EXPOSE 3000

CMD [ "npm", "start" ]
