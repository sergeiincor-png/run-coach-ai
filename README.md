
# ИИ-Тренер для забегов (Skeleton)

Этот проект представляет собой готовый скелет приложения с авторизацией через Telegram, Next.js на фронтенде и FastAPI на бэкенде.

## Стек технологий
- **Frontend:** Next.js (App Router, Tailwind CSS, TypeScript)
- **Backend:** Python FastAPI (Async)
- **Database:** PostgreSQL (SQLAlchemy 2.0, Alembic)
- **Proxy:** Nginx
- **Deployment:** Docker Compose

## Как запустить

1. **Создайте Telegram-бота:**
   - Напишите [@BotFather](https://t.me/botfather).
   - Создайте нового бота и получите `BOT_TOKEN`.
   - В настройках бота через `/setdomain` укажите домен вашего сайта (для локальной разработки с Telegram Login Widget требуется HTTPS и домен, например через `ngrok` или `localtonet`).

2. **Настройте окружение:**
   - Скопируйте `.env.example` в `.env`:
     ```bash
     cp .env.example .env
     ```
   - Заполните `BOT_TOKEN` и `BOT_USERNAME`.

3. **Запустите проект:**
   ```bash
   docker-compose up --build
   ```

4. **Доступ:**
   - Frontend: [http://localhost](http://localhost)
   - API Docs: [http://localhost/api/docs](http://localhost/api/docs)

## Локальная разработка с Telegram Login
Виджет логина Telegram проверяет соответствие домена. Для тестирования локально:
1. Используйте `ngrok`: `ngrok http 80`.
2. Добавьте полученный HTTPS URL в настройки бота в BotFather.
3. Открывайте проект по адресу из ngrok.

## Команды миграций
При добавлении новых моделей:
```bash
docker-compose exec api alembic revision --autogenerate -m "description"
docker-compose exec api alembic upgrade head
```
