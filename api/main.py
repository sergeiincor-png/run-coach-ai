from fastapi import FastAPI
from api.routers import auth, me

app = FastAPI(title="AI Coach API")
app.include_router(auth.router, prefix="/api/auth")
app.include_router(me.router, prefix="/api/me")

@app.get("/api/health")
async def health():
    return {"status": "ok"}
