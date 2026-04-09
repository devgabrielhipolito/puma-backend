FROM node:20-alpine AS build

WORKDIR /app

COPY . .
COPY .env .env

RUN npm install --quiet --no-optional --loglevel=error --no-fund

RUN npm run  build
CMD ["npm", "run", "start:prod"]