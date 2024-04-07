FROM node:21.7-alpine3.18

WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT ["npx", "expo", "start", "--port=8080"]
