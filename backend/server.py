from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import jwt
import hashlib
import shutil

ROOT_DIR = Path(__file__).parent
UPLOADS_DIR = ROOT_DIR / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Config
JWT_SECRET = os.environ.get('JWT_SECRET', 'salehi-admin-secret-2025')
JWT_ALGORITHM = "HS256"

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()


# ======== Models ========

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = ""
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactMessageCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    message: str

class Activity(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    image_url: str = ""
    content: str = ""
    date: str = ""
    is_published: bool = True
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ActivityCreate(BaseModel):
    title: str
    category: str
    image_url: str = ""
    content: str = ""
    date: str = ""
    is_published: bool = True

class ActivityUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    content: Optional[str] = None
    date: Optional[str] = None
    is_published: Optional[bool] = None

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    token: str
    username: str


# ======== Auth Helpers ========

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def create_token(username: str) -> str:
    payload = {
        "sub": username,
        "iat": datetime.now(timezone.utc).timestamp(),
        "exp": (datetime.now(timezone.utc).timestamp()) + 86400  # 24 hours
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ======== Seed Default Admin ========

async def seed_admin():
    existing = await db.admins.find_one({"username": "admin"})
    if not existing:
        await db.admins.insert_one({
            "username": "admin",
            "password_hash": hash_password("admin123"),
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        logging.info("Default admin created: admin / admin123")

async def seed_activities():
    count = await db.activities.count_documents({})
    if count == 0:
        seed_data = [
            {
                "id": str(uuid.uuid4()),
                "title": "ব্যারিস্টার মাহবুবুল আলম সালেহী: উলিপুরের এক অদম্য সংগ্রামীর গল্প",
                "category": "ব্যক্তিত্ব",
                "image_url": "https://media.bdji.org/images/1211.original.format-webp.webp",
                "content": "ব্যারিস্টার মাহবুবুল আলম সালেহী উলিপুরের এক অদম্য সংগ্রামী যিনি আন্তর্জাতিক মঞ্চে বাংলাদেশের গণতন্ত্র ও মানবাধিকারের পক্ষে কাজ করেছেন।",
                "date": "২০২৫",
                "is_published": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "জামায়াতে ইসলামীর কেন্দ্রীয় নির্বাহী পরিষদের বৈঠক",
                "category": "রাজনীতি",
                "image_url": "https://media.bdji.org/images/557585451_122151827564749601_11561.original.format-webp.webp",
                "content": "জামায়াতে ইসলামীর কেন্দ্রীয় নির্বাহী পরিষদের বৈঠকে বিভিন্ন গুরুত্বপূর্ণ বিষয় নিয়ে আলোচনা হয়।",
                "date": "২০২৫",
                "is_published": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "কুড়িগ্রামে জামায়াতের মিছিল ও জেলা প্রশাসকের কাছে স্মারকলিপি প্রদান",
                "category": "কার্যক্রম",
                "image_url": "https://media.bdji.org/images/4242.original.format-webp.webp",
                "content": "কুড়িগ্রামে জামায়াতের মিছিল ও জেলা প্রশাসকের কাছে স্মারকলিপি প্রদান করা হয়েছে।",
                "date": "২০২৫",
                "is_published": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "নিন্দা ও প্রতিবাদ বার্তা",
                "category": "বিবৃতি",
                "image_url": "https://media.bdji.org/images/121212.original.format-webp.webp",
                "content": "সাম্প্রতিক ঘটনায় নিন্দা ও প্রতিবাদ জানিয়ে বিবৃতি প্রদান করেছেন ব্যারিস্টার সালেহী।",
                "date": "২০২৫",
                "is_published": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "সমৃদ্ধ উলিপুর গড়ার লক্ষ্যে রংপুরে উলিপুরবাসীর মতবিনিময় সভা অনুষ্ঠিত",
                "category": "সভা",
                "image_url": "https://media.bdji.org/images/557602506_122136658088904504_46541.original.format-webp.webp",
                "content": "সমৃদ্ধ উলিপুর গড়ার লক্ষ্যে রংপুরে উলিপুরবাসীর মতবিনিময় সভা সফলভাবে অনুষ্ঠিত হয়েছে।",
                "date": "২০২৫",
                "is_published": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.activities.insert_many(seed_data)
        logging.info(f"Seeded {len(seed_data)} activities")


# ======== Routes ========

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# Status endpoints
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Contact endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    doc = contact_obj.model_dump()
    _ = await db.contact_messages.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    return messages

# ======== Admin Auth ========

@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(input: AdminLogin):
    admin = await db.admins.find_one({"username": input.username}, {"_id": 0})
    if not admin or admin["password_hash"] != hash_password(input.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(input.username)
    return AdminLoginResponse(token=token, username=input.username)

@api_router.get("/admin/me")
async def admin_me(username: str = Depends(verify_token)):
    return {"username": username}

# ======== Activities CRUD ========

@api_router.get("/activities", response_model=List[Activity])
async def get_activities(published_only: bool = True):
    query = {"is_published": True} if published_only else {}
    activities = await db.activities.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return activities

@api_router.get("/activities/{activity_id}", response_model=Activity)
async def get_activity(activity_id: str):
    activity = await db.activities.find_one({"id": activity_id}, {"_id": 0})
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    return activity

@api_router.post("/activities", response_model=Activity)
async def create_activity(input: ActivityCreate, username: str = Depends(verify_token)):
    activity_dict = input.model_dump()
    activity_obj = Activity(**activity_dict)
    doc = activity_obj.model_dump()
    _ = await db.activities.insert_one(doc)
    return activity_obj

@api_router.put("/activities/{activity_id}", response_model=Activity)
async def update_activity(activity_id: str, input: ActivityUpdate, username: str = Depends(verify_token)):
    existing = await db.activities.find_one({"id": activity_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Activity not found")
    
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.activities.update_one({"id": activity_id}, {"$set": update_data})
    updated = await db.activities.find_one({"id": activity_id}, {"_id": 0})
    return Activity(**updated)

@api_router.delete("/activities/{activity_id}")
async def delete_activity(activity_id: str, username: str = Depends(verify_token)):
    result = await db.activities.delete_one({"id": activity_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Activity not found")
    return {"message": "Activity deleted"}

# ======== Admin: Contact Messages ========

@api_router.get("/admin/contacts", response_model=List[ContactMessage])
async def get_admin_contacts(username: str = Depends(verify_token)):
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return messages

@api_router.delete("/admin/contacts/{contact_id}")
async def delete_contact(contact_id: str, username: str = Depends(verify_token)):
    result = await db.contact_messages.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted"}

# ======== Image Upload ========

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}

@api_router.post("/upload")
async def upload_image(file: UploadFile = File(...), username: str = Depends(verify_token)):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type not allowed. Allowed: {', '.join(ALLOWED_EXTENSIONS)}")
    
    file_id = str(uuid.uuid4())
    filename = f"{file_id}{ext}"
    filepath = UPLOADS_DIR / filename
    
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Build the URL relative to the API
    file_url = f"/api/uploads/{filename}"
    return {"url": file_url, "filename": filename}


# Include router
app.include_router(api_router)

# Mount uploads as static files
app.mount("/api/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

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

@app.on_event("startup")
async def startup():
    await seed_admin()
    await seed_activities()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
