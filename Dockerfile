#FROM nginx:stable-alpine
#COPY dist /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

# Этап 1: билд фронтенда на Node
# ---------- builder (используем Debian-based Node для надёжной установки нативных бинарей) ----------
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Ускоряем установку SSL сертификатов (иногда нужно для запросов при установке пакетов)
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Сначала копируем только package*.json чтобы Docker-кэш работал
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая devDeps!), потому что vite нужен для сборки
RUN npm install --no-audit --no-fund

# Копируем исходники проекта
COPY . .

# Сборка фронтенда
RUN npm run build

# ---------- финальный образ (nginx отдаёт собранную статику) ----------
FROM nginx:1.25-alpine AS runner

# Убираем дефолтный конфиг и кладём наш
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранный сайт
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
