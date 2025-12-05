# --- Base Image ---
FROM node:20-alpine AS base
WORKDIR /app

# Copy package.json dan package-lock.json dulu (agar cache efisien)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# --- Builder Image ---
FROM base AS builder
WORKDIR /app

# Copy seluruh project setelah dependencies terinstall
COPY . .

# Build Next.js dengan mode standalone
RUN npm run build

# --- Runner Image ---
FROM node:20-alpine AS runner
WORKDIR /app

# Copy hasil build dari builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static .next/static

# Jalankan aplikasi pada port 3100
CMD ["node", "server.js"]
