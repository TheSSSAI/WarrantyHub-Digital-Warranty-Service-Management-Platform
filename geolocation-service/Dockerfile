# ==============================================================================
# BUILD STAGE
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files for dependency installation
COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm ci

# Copy application source
COPY . .

# Build the application
RUN npm run build

# ==============================================================================
# PRODUCTION STAGE
# ==============================================================================
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built artifacts from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Create a non-root user for security
RUN addgroup -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nestjs

# Change ownership of the application directory
RUN chown -R nestjs:nodejs /usr/src/app

# Switch to non-root user
USER nestjs

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]