import hmac
import hashlib
from jose import jwt
from datetime import datetime, timedelta

def verify_telegram_hash(data: dict, bot_token: str) -> bool:
    check_hash = data.pop('hash', None)
    data_list = sorted([f"{k}={v}" for k, v in data.items() if v is not None])
    data_check_string = "\n".join(data_list)
    secret_key = hashlib.sha256(bot_token.encode()).digest()
    hmac_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    return hmac_hash == check_hash

def create_access_token(data: dict, secret: str):
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, secret, algorithm="HS256")
