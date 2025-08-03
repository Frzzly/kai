# Step 1: Build stage
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Production image
FROM node:20
WORKDIR /app

COPY --from=builder /app .

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
