# Stage 1: Сборка приложения

# Используйте официальный образ Node.js
FROM node:18 as build

# Создайте директорию приложения
WORKDIR /app

# Скопируйте зависимости и установите их
COPY package.json .
RUN yarn install

COPY . .

# Выполните команду сборки приложения React
RUN yarn build

CMD ["yarn", "start"]

EXPOSE 80

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html