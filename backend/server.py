from fastapi import FastAPI, APIRouter, HTTPException, status, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Annotated
import uuid
from datetime import datetime, timezone
# Yeni import: Güvenlik için
from fastapi.security import OAuth2PasswordRequestForm
import auth # auth.py dosyanızı import ediyoruz

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
# Kullanıcıların tutulacağı koleksiyonu tanımlıyoruz
users_collection = db.users

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# --- YENİ KULLANICI MODELLERİ ---
class UserBase(BaseModel):
    username: str
    password: str
    email: str

class UserCreate(UserBase):
    pass

class UserInDB(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password: str # Bu artık hashlenmiş şifre olacak
    email: str
    role: str = "customer" # Varsayılan rol
    
    model_config = ConfigDict(extra="ignore")

# Define Mevcut Modeller
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# --- YENİ GİRİŞ/KAYIT ROTLARI ---

@api_router.post("/register")
async def register_user(user_data: UserCreate):
    # 1. Kullanıcının zaten var olup olmadığını kontrol et
    if await users_collection.find_one({"username": user_data.username}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu kullanıcı adı zaten alınmış"
        )
    
    # 2. Şifreyi Hash'le ve kullanıcı nesnesini oluştur
    hashed_password = auth.get_password_hash(user_data.password)
    user_in_db = UserInDB(
        username=user_data.username,
        email=user_data.email,
        # Şifre alanını HASH'lenmiş şifre ile değiştiriyoruz
        password=hashed_password 
    )
    
    # 3. Veritabanına kaydet
    doc = user_in_db.model_dump(exclude_none=True)
    _ = await users_collection.insert_one(doc)
    
    return {"message": "Kullanıcı başarıyla kaydedildi"}

@api_router.post("/login")
async def login_user(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    # 1. Kullanıcıyı Veritabanında Ara
    user = await users_collection.find_one({"username": form_data.username})

    # 2. Kullanıcının Var Olup Olmadığını Kontrol Et
    if user is None:
        # Hata: Kullanıcı bulunamadı
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Kullanıcı adı veya şifre hatalı"
        )

    # 3. Şifreyi Doğrula (auth.py dosyanızdaki fonksiyonu kullanıyoruz)
    # user['password'] alanı HASH'lenmiş şifreyi içermelidir
    if not auth.verify_password(form_data.password, user['password']):
        # Hata: Şifre eşleşmiyor
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Kullanıcı adı veya şifre hatalı"
        )
    
    # 4. Başarılı Giriş: JWT Token Oluştur
    access_token = auth.create_access_token(
        data={"sub": user["username"], "role": user.get("role", "customer")}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


# Mevcut Rotalar
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
