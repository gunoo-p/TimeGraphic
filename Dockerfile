FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY web/package.json web/
COPY server/package.json server/
RUN npm ci

# 개발용: 소스는 compose가 마운트한다
FROM deps AS dev

FROM deps AS build
COPY . .
RUN npm run build -w web && npm run build -w server

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY web/package.json web/
COPY server/package.json server/
RUN npm ci -w server --omit=dev
COPY --from=build /app/server/dist server/dist
COPY --from=build /app/web/dist server/public
WORKDIR /app/server
EXPOSE 3001
CMD ["node", "dist/index.js"]
