# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Set environment to production
ENV NODE_ENV=production

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Expose the port for health checks (defaults to 3000 in main.ts if not configured)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]