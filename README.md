# My Next.js App (Dockerized)

This project is a [Next.js](https://nextjs.org/) application running inside Docker for consistent development and easy deployment.

## 🚀 Getting Started

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed
- Git (to clone this repository)
- WSL2/Linux/Mac up and running

### 🐳 Run the app with Docker Compose

1. Clone this repository (**Important for Windows:** Into a folder inside WSL!) and Navigate there:
   ```bash
   git clone <SSH-Link>/<HTTPS-Link>
   cd <repo-name>
   ```

2. Build the Docker image:
   ```bash
   docker compose build
   ```

3. Start the container:
   ```bash
   docker compose up
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

The app should now be running.

---

### 🔄 Hot Reload (Development Mode)

If you’re developing inside Docker:
- Files in your local project directory are mounted into the container.
- **It is important to not use the Windows File System as location for the project files, as this will break the hot reload.**
- Changes should then be reflected automatically thanks to Next.js hot reload.
- If hot reload doesn’t work reliably, you may need to enable polling(although this shouldn't be necessary if everything was done correctly):
  ```yaml
  environment:
    CHOKIDAR_USEPOLLING: "true"
    WATCHPACK_POLLING: "true"
  ```
  Add this under your service in `docker-compose.yml`.

---

### ⚙️ Useful Commands

Stop containers:
```bash
docker compose down
```

Rebuild without cache:
```bash
docker compose build --no-cache
```

Run in detached mode (no logs in terminal):
```bash
docker compose up -d
```

View logs:
```bash
docker compose logs -f
```

---

### 🧹 Cleanup

Remove all stopped containers, unused images, and networks:
```bash
docker system prune -f
```

---

## 📦 Deployment


🛠️**WORK IN PROGRESS**🛠️

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Push and open a PR

---

## 📜 License

MIT
