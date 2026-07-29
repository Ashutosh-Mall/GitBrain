FROM node:22-alpine

RUN apk add --no-cache git

WORKDIR /app

COPY /apps/api ./apps/api
WORKDIR /app/apps/api

RUN npm install --legacy-peer-deps
RUN npm run build 

EXPOSE 3000


CMD ["npm", "run", "start"]