# Stage 1: Development
FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production Build
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

# Stage 3: Production Server
FROM node:20-alpine AS production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Add a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD ["node", "dist/main"]