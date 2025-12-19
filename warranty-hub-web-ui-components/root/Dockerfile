# Build Stage
FROM node:20.11.0-alpine AS builder

WORKDIR /app

# Copy configuration files
COPY package*.json ./
COPY tsconfig.json ./
COPY .npmrc ./

# Install dependencies
# Note: In a real CI environment, .npmrc would be populated with a token
RUN npm ci

# Copy source code
COPY . .

# Build library and storybook
RUN npm run build
RUN npm run build-storybook

# Serve Stage (Serving Storybook documentation)
FROM nginx:alpine

# Copy built storybook files to nginx html directory
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Copy custom nginx config if needed (using default for now)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]