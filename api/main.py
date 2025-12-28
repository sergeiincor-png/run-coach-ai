from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import auth, me

# Создаем приложение FastAPI
app = FastAPI(
    title="AI RUN COACH API",
    description="Бэкенд для сервиса подготовки к забегам с авторизацией через Telegram",
    version="1.0.0"
)

# Настройка CORS (нужна для работы фронтенда и бэкенда на разных портах, если не используется Nginx)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # В продакшене замените на конкретный домен
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры с соответствующими префиксами
# Логика /auth/telegram находится внутри auth.router
app.include_router(auth.router, prefix="/api/auth", tags=["Авторизация"])

# Защищенный эндпоинт /me находится внутри me.router
app.include_router(me.router, prefix="/api/me", tags=["Профиль"])

@app.get("/api/health")
async def health_check():
    """Эндпоинт для проверки работоспособности сервера"""
    return {
        "status": "online",
        "message": "Бэкенд ИИ-тренера работает корректно",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    # Запуск сервера на порту 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
