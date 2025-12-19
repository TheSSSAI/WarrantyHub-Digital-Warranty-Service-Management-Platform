# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
USER nestjs

CMD ["node", "dist/main"]