# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /usr/src/app

# Set environment to production
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built assets from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /usr/src/app

USER nodejs

# Expose HTTP port (API/Health) and WebSocket port (if shared)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]