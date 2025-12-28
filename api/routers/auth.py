from fastapi import APIRouter, HTTPException, Response, Depends
from api.core.security import verify_telegram_hash, create_access_token
from api.core.config import settings
from api.models.database import get_db
from api.models.user import User

router = APIRouter()

@router.post("/telegram")
async def telegram_login(data: dict, response: Response, db=Depends(get_db)):
    if not verify_telegram_hash(data.copy(), settings.BOT_TOKEN):
        raise HTTPException(status_code=400, detail="Ошибка безопасности")
    
    user_id = data.get('id')
    user = await db.get(User, user_id)
    if not user:
        user = User(telegram_id=user_id, first_name=data.get('first_name'), username=data.get('username'))
        db.add(user)
        await db.commit()

    token = create_access_token({"sub": str(user_id)}, settings.JWT_SECRET)
    response.set_cookie(key="access_token", value=token, httponly=True)
    return {"status": "ok"}
