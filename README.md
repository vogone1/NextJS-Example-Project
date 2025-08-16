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
2. Initialize the node_modules-folder once. Subsequently the node_modules-folder will be replaced when building the image, but for the first run it has to exist(can be deleted after):
    ```bash
   npm i
   ```
3. Build the Docker image:
   ```bash
   docker compose build
   ```

4. Start the container:
   ```bash
   docker compose up
   ```

5. Open your browser and go to:
   ```
   http://localhost:3000
   ```

The app should now be running.

---
### 🔄 Hot Reload (Development Mode)
---
If you’re developing inside Docker(**strongly recommended for Windows**):
- Files in your local project directory are mounted into the container.
- ⚠️ **It is Important not to use the Windows File System, as a location for the project files, as this will break the hot reload. Unless Microsoft fixes this bug.** ⚠️
- Changes should then be reflected automatically thanks to Next.js hot reload.
- If hot reload doesn’t work reliably, you may need to enable polling(although this shouldn't be necessary if everything was done correctly):
  ```yaml
  environment:
    CHOKIDAR_USEPOLLING: "true"
    WATCHPACK_POLLING: "true"
  ```
  Add this under your service in `docker-compose.yml`.

---
## 🛠 Troubleshooting
If you run into problems getting the container to run, try starting with a clean slate:

1. Remove only this project’s containers and volumes:
   ```bash
   docker compose down -v
   docker volume prune
   ```

2. Rebuild everything from scratch:
   ```bash
   docker compose build --no-cache
   docker compose up
   ```

---

### 📦 Adding Packages

Since dependencies are installed inside the container, you should add packages through Docker:

1. Enter the running container:
   ```bash
   docker compose exec nextjs-app sh
   ```

2. Install the package using npm:
   ```bash
   npm install <package-name>
   ```

3. Exit the container:
   ```bash
   exit
   ```

4. To persist changes, rebuild your image so that `node_modules` stays consistent:
   ```bash
   docker compose down
   docker compose build --no-cash
   docker compose up
   ```

⚠️ **Important:** Always install packages inside the container so the development and production environments stay aligned.

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
