# ─── Stage 1: Build frontend ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Build frontend (base URL = / for production)
COPY . .
ENV VITE_BASE_URL=/
ENV VITE_API_URL=
RUN npm run build

# ─── Stage 2: Production server ─────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Install rclone + build tools for native modules (better-sqlite3)
RUN apk add --no-cache rclone python3 make g++

# Only install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && apk del python3 make g++

# Copy server + database module + built frontend
COPY server.js database.js ./
COPY --from=builder /app/dist ./dist

# Copy backup infrastructure
COPY backup.sh entrypoint.sh ./
RUN chmod +x /app/backup.sh /app/entrypoint.sh
COPY crontab /etc/crontabs/root

# Data directory (mount as volume for persistence)
RUN mkdir -p /app/data

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["/app/entrypoint.sh"]
