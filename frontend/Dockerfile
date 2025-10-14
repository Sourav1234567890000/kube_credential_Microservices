# -----------------------------
# 1️⃣ Build Stage
# -----------------------------
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the frontend (production)
RUN npm run build

# -----------------------------
# 2️⃣ Production Stage (Nginx)
# -----------------------------
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Use custom Nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 internally
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
