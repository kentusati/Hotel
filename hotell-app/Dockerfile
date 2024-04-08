# Stage 1
FROM node:18 AS builder
WORKDIR /app
RUN npm install -g npm
COPY package*.json package-lock*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2
RUN npm install -g serve
CMD serve -p 5173 -s dist