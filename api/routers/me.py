from fastapi import APIRouter, Cookie, Depends, HTTPException
from jose import jwt
from api.core.config import settings
from api.models.database import get_db
from api.models.user import User

router = APIRouter()

@router.get("")
async def get_me(access_token: str = Cookie(None), db=Depends(get_db)):
    if not access_token:
        raise HTTPException(status_code=401)
    payload = jwt.decode(access_token, settings.JWT_SECRET, algorithms=["HS256"])
    user = await db.get(User, int(payload.get("sub")))
    return user
