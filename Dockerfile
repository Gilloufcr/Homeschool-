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

# Only install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy server + built frontend
COPY server.js ./
COPY --from=builder /app/dist ./dist

# Data directory (mount as volume for persistence)
RUN mkdir -p /app/data

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["node", "server.js"]
