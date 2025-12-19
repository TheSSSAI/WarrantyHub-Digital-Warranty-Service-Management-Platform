# Base stage
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist

# Set environment to production
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main"]