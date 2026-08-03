FROM node:22-bookworm-slim AS builder

RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY apps/api ./apps/api

WORKDIR /app/apps/api

RUN npm install --legacy-peer-deps
RUN npm run build

FROM node:22-bookworm-slim AS runner

RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/apps/api ./apps/api

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["npm", "run", "start"]