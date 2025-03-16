FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=10000

EXPOSE ${PORT}

CMD ["sh", "-c", "npm run preview -- --port ${PORT} --host 0.0.0.0"] 