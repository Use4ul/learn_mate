# Используем официальный образ Node.js 18
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем переменные окружения
ENV DATABASE_URL=postgresql://postgres:LuchshayaRabotaVMire@db.pujfkkjowunsqchvsttf.supabase.co:5432/postgres

# Копируем обе части приложения (клиентскую и серверную) в контейнер
COPY . .

# Установка зависимостей и сборка клиентской части
RUN cd client && npm install && npm run build

# Установка зависимостей для серверной части
RUN cd server && npm install

# Определяем порт, который будет прослушивать сервер
EXPOSE 4000

# Запускаем сервер при запуске контейнера
CMD [ "node", "server/app.js" ]