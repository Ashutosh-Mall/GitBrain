From node:22-alpine

WORKDIR /app

COPY /apps/web ./apps/web

WORKDIR /app/apps/web
RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
