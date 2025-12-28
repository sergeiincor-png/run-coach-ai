from fastapi import FastAPI

app = FastAPI(title="AI Run Trainer API")

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Бэкенд на связи!"}

@app.get("/api/test")
async def test():
    return {"message": "Если ты это видишь через браузер, значит Nginx и API подружились"}