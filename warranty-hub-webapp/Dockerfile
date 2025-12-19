# Use Node.js 20 Alpine as the base image for smaller footprint
FROM node:20-alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json* ./

# Install dependencies using npm ci for clean, deterministic installs
# If you are using yarn or pnpm, adjust this accordingly
RUN npm ci

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application
# Note: Ensure that next.config.js has output: 'standalone' enabled
RUN npm run build

# Stage 3: Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
mkdir .next
chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# Copy the standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the listening port
EXPOSE 3000

# Set environment variables for the server
ENV PORT 3000
# set hostname to 0.0.0.0 to allow external access within the container network
ENV HOSTNAME "0.0.0.0"

# Start the server using the standalone node server
CMD ["node", "server.js"]