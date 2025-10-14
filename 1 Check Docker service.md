# 1️⃣ Check Docker service is running
sudo systemctl status docker

# (Optional) Start Docker if not running
sudo systemctl start docker

# 2️⃣ Go to project folder
cd /home/sourav/Documents/project/kube-credentialsDocker/backend/issuance-service

# 3️⃣ Stop any existing container running the same service
docker ps -q --filter "ancestor=issuance-service" | xargs -r docker stop

# 4️⃣ Remove stopped containers (optional, clean environment)
docker container prune -f

# 5️⃣ Check if port 5001 is free
sudo lsof -i :5001

# (Optional) Kill process using port 5001
# sudo kill -9 <PID>

# 6️⃣ Build Docker image with BuildKit enabled
DOCKER_BUILDKIT=1 docker build -t issuance-service .

# 7️⃣ Run container on port 5001
docker run -p 5001:5001 issuance-service

# ✅ Optional: Run in detached mode (background)
# docker run -d -p 5001:5001 issuance-service

# ✅ Optional: Mount local data folder for development
# docker run -p 5001:5001 -v $(pwd)/src/data:/app/dist/data issuance-service

# 8️⃣ Check running containers
docker ps

# 9️⃣ Stop container when done
# docker stop <CONTAINER_ID>




Run your container again

Step 1 — Stop the container using port 5001
1️⃣ List all running Docker containers
docker ps

2️⃣ Stop the container
docker stop <CONTAINER_ID>
exmple 
        CONTAINER ID        IMAGE                PORTS                    NAMES
        76d33abe4358       issuance-service     0.0.0.0:5001->5001/tcp   youthful_colden
        
docker stop 76d33abe4358
3️⃣ Remove the container (optional)
docker rm <CONTAINER_ID>
4️⃣ Verify port 5001 is free
sudo lsof -i :5001

5️⃣ Run your container again
docker run -p 5001:5001 issuance-service

💡 Tip: In the future, before running a new container on the same port, you can do:
docker ps -q --filter "ancestor=issuance-service" | xargs -r docker stop
This stops any old container using the same image automatically.


# 1️⃣ Go to project folder
cd /home/sourav/Documents/project/kube-credentialsDocker/backend/issuance-service

# 2️⃣ Stop any old containers running this image
docker ps -q --filter "ancestor=issuance-service" | xargs -r docker stop

# 3️⃣ Remove stopped containers (optional cleanup)
docker ps -a -q --filter "ancestor=issuance-service" | xargs -r docker rm

# 4️⃣ Check if port 5001 is free
sudo lsof -i :5001

# 5️⃣ Kill any process still using port 5001 (if needed)
# sudo kill -9 <PID>

# 6️⃣ Build Docker image with BuildKit
DOCKER_BUILDKIT=1 docker build -t issuance-service .

# 7️⃣ Run container on port 5001
docker run -p 5001:5001 issuance-service

# ✅ Optional: Run in detached mode (background)
# docker run -d -p 5001:5001 issuance-service

# ✅ Optional for development: Mount local data folder to container
# docker run -p 5001:5001 -v $(pwd)/src/data:/app/dist/data issuance-service

# 8️⃣ Check running containers
docker ps

# 9️⃣ Stop container when done
# docker stop <CONTAINER_ID>





# -----------------------------
# STEP 0 — Stop and remove old containers
# -----------------------------
docker ps -q | xargs -r docker stop
docker ps -a -q | xargs -r docker rm

# -----------------------------
# STEP 1 — Create Docker network (if not already created)
# -----------------------------
docker network create kube-network || echo "Network already exists"

# -----------------------------
# STEP 2 — Build Docker images
# -----------------------------

# 2a — Issuance-service
cd /home/sourav/Documents/project/kube-credentialsDocker/backend/issuance-service
DOCKER_BUILDKIT=1 docker build -t issuance-service .

# 2b — Verification-service
cd /home/sourav/Documents/project/kube-credentialsDocker/backend/verification-service
DOCKER_BUILDKIT=1 docker build -t verification-service .

# -----------------------------
# STEP 3 — Run containers on the network
# -----------------------------

# 3a — Issuance-service (port 5001)
docker run -d --name issuance-service --network kube-network -p 5001:5001 issuance-service

# 3b — Verification-service (port 3001)
docker run -d --name verification-service --network kube-network -p 3001:3001 verification-service

# -----------------------------
# STEP 4 — Test
# -----------------------------
echo "Issuance-service → http://localhost:5001"
echo "Verification-service → http://localhost:3001"

# -----------------------------
# NOTE — If Verification-service cannot reach Issuance-service:
# Make sure inside verification-service code:
# const ISSUANCE_API = 'http://issuance-service:5001'
# instead of localhost
# -----------------------------




1️⃣ Full cleanup of Docker + Kubernetes (Kind/Minikube)

# Stops & removes all Docker containers, deletes images, deletes Kind/Minikube clusters
docker ps -q | xargs -r docker stop && docker ps -a -q | xargs -r docker rm && docker images -q | xargs -r docker rmi -f && kind delete cluster || true && minikube stop || true && minikube delete || true && echo "✅ All Docker & Kubernetes cleaned!"


2️⃣ Full restart of Docker + Kubernetes (Kind/Minikube)

# Start Docker service, then start Minikube or Kind cluster
sudo systemctl start docker && kind create cluster || minikube start && echo "✅ Docker & Kubernetes restarted!"


Here’s a single all-in-one shell script for managing Docker + Kubernetes (Kind/Minikube). 
You can copy this into a file called k8-toggle.sh and make it executable (chmod +x k8-toggle.sh)

#!/bin/bash
# k8-toggle.sh - Full Docker + Kubernetes toggle script

ACTION=$1

if [ "$ACTION" == "stop" ]; then
    echo "🛑 Stopping all Docker containers, removing images, and deleting Kubernetes clusters..."
    docker ps -q | xargs -r docker stop
    docker ps -a -q | xargs -r docker rm
    docker images -q | xargs -r docker rmi -f
    kind delete cluster || true
    minikube stop || true
    minikube delete || true
    echo "✅ All Docker & Kubernetes cleaned!"
elif [ "$ACTION" == "start" ]; then
    echo "⚡ Starting Docker & Kubernetes..."
    sudo systemctl start docker
    if command -v kind &> /dev/null; then
        kind create cluster || true
    else
        minikube start || true
    fi
    echo "✅ Docker & Kubernetes restarted!"
else
    echo "Usage: $0 {stop|start}"
    echo "Example: ./k8-toggle.sh stop   # Stop & clean everything"
    echo "         ./k8-toggle.sh start  # Start Docker & Kubernetes"
fi

bash
# Stop everything
./k8-toggle.sh stop

# Start everything
./k8-toggle.sh start





