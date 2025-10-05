## 🚀 Getting Started

```bash
# Setup environment
cp .env.example .env

# Pilih versi Node.js
nvm use 22.12.0

# Install dependencies
npm install

# Jalankan server dengan hot reload di localhost:8080
npm run dev

## 🚀 Docker Run

docker build --no-cache --platform=linux/amd64 -t wom-book-service:v1.0.0 .
docker run -d -p 9000:9000 --name wom-book-service --env-file env-docker wom-book-service:v1.0.0