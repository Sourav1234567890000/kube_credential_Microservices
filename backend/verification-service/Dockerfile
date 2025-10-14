# -----------------------------
# 1️⃣ Builder stage (compiles TypeScript)
# -----------------------------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and tsconfig
COPY package*.json tsconfig.json ./

# Install dependencies (dev + prod)
RUN npm install

# Copy source code
COPY src ./src

# Compile TypeScript
RUN npm run build

# -----------------------------
# 2️⃣ Runner stage (production)
# -----------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled JS from builder
COPY --from=builder /app/dist ./dist

# Expose port (adjust as needed)
EXPOSE 5002

# Start the app
CMD ["node", "dist/index.js"]
