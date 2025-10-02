#Stage 1: Build the application
# This stage installs dependencies and builds the application
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --progress=false
COPY . .

#Stage 2: Run the application
# This stage uses the built application and runs it
FROM node:20
WORKDIR /app
COPY --from=builder ./app ./
EXPOSE 3000
CMD ["npm", "run", "dev"]
