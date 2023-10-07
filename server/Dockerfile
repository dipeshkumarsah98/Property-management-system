FROM node:18.18.0-alpine3.18 as development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

EXPOSE 8000

CMD [ "npm", "run", "dev" ]
