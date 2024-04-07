FROM node:21.7-alpine3.18

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS="0.0.0.0"
WORKDIR /app
COPY . .

RUN npm install
ENTRYPOINT ["npx", "expo", "start", "--port=8080"]
