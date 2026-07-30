FROM node:22-bookworm-slim

RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY /apps/api ./apps/api

WORKDIR /app/apps/api

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]