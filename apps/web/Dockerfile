From node:22-alpine AS builder

WORKDIR /app

COPY /apps/web ./apps/web

WORKDIR /app/apps/web
RUN npm install --legacy-peer-deps
RUN npm run build

From nginx:alpine

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
