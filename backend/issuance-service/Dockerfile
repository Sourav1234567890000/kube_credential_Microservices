# -----------------------------
# 1️⃣ Builder stage (compiles TypeScript)
# -----------------------------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and tsconfig
COPY package*.json tsconfig.json ./

# Install all dependencies (including dev for TypeScript build)
RUN npm install

# Copy source code
COPY src ./src

# Compile TypeScript
RUN npm run build

# Manually copy data folder into dist (TypeScript does not copy JSON by default)
RUN mkdir -p dist/data && cp -r src/data/* dist/data/

# -----------------------------
# 2️⃣ Runner stage (production)
# -----------------------------
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only package files and install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled JS and data folder from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5001

# Start the app
CMD ["node", "dist/index.js"]
