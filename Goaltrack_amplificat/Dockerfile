# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
# Instalăm TOATE dependențele (inclusiv devDependencies) necesare pentru build
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=build /app/package*.json ./
# Aici păstrăm doar dependențele de producție pentru a ține imaginea finală mică
RUN npm ci --only=production

COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/server.js"]