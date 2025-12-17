# Use the shared base image
FROM node:22.19-alpine AS base

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with optimizations
RUN npm ci --ignore-scripts && \
    npm cache clean --force

# Copy all source code for building
COPY . .

# Build the project
RUN npm run build

# Final stage
FROM nginx:1.28.0-alpine

COPY --from=base /app/dist /usr/share/nginx/html
