FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

FROM node:18-alpine 
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY .env ./
EXPOSE 4000
CMD ["node", "dist/index.js"]
