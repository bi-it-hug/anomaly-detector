FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 8082

CMD ["npx", "expo", "start", "--port", "8082", "--host", "tunnel"]
