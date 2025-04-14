from fastapi import FastAPI, HTTPException, Depends, status, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import FileResponse
from pydantic import BaseModel
from datetime import datetime
import mysql.connector
import os
import uuid

app = FastAPI()

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Basic Auth Setup
security = HTTPBasic()
VALID_USERNAME = "vebbox"
VALID_PASSWORD = "12345"

def basic_auth(credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.username != VALID_USERNAME or credentials.password != VALID_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="library_db",
        port=3306
    )

# --- BOOK ROUTES ---

@app.get("/books")
def get_books():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id, book_name, author_name, published_year, description FROM books")
        books = cursor.fetchall()
        cursor.close()
        db.close()
        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/books/image/{book_id}")
def get_book_image(book_id: int):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT book_image FROM books WHERE id = %s", (book_id,))
        book = cursor.fetchone()
        cursor.close()
        db.close()

        if not book or not book["book_image"]:
            raise HTTPException(status_code=404, detail="Image not found")

        image_path = book["book_image"]
        if not os.path.exists(image_path):
            raise HTTPException(status_code=404, detail="File not found")

        return FileResponse(image_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/books/add")
async def add_new_book(
    book_name: str = Form(...),
    author_name: str = Form(...),
    published_year: str = Form(...),
    description: str = Form(...),
    book_image: UploadFile = File(...)
):
    try:
        os.makedirs("uploads", exist_ok=True)
        filename = f"uploads/{uuid.uuid4().hex}_{book_image.filename}"
        with open(filename, "wb") as buffer:
            buffer.write(await book_image.read())

        db = get_db_connection()
        cursor = db.cursor()
        query = "INSERT INTO books (book_name, author_name, published_year, description, book_image) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(query, (book_name, author_name, published_year, description, filename))
        db.commit()
        cursor.close()
        db.close()
        return {"message": "Book added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/books/edit")
async def update_book(
    book_id: int = Form(...),
    book_name: str = Form(...),
    author_name: str = Form(...),
    published_year: str = Form(...),
    description: str = Form(...),
    book_image: UploadFile = File(...)
):
    try:
        os.makedirs("uploads", exist_ok=True)
        image_path = os.path.join("uploads", f"{uuid.uuid4().hex}_{book_image.filename}")
        with open(image_path, "wb") as buffer:
            buffer.write(await book_image.read())

        db = get_db_connection()
        cursor = db.cursor()
        query = """
            UPDATE books 
            SET book_name=%s, author_name=%s, published_year=%s, description=%s, book_image=%s 
            WHERE id=%s
        """
        values = (book_name, author_name, published_year, description, image_path, book_id)
        cursor.execute(query, values)
        db.commit()
        cursor.close()
        db.close()

        return {"message": "Book updated successfully!", "image_url": image_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- DASHBOARD STATS ROUTES ---

@app.get("/totalusers")
def total_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    conn.close()
    return {"total_users": count}

@app.get("/totalbooks")
def total_books():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM books")
    count = cursor.fetchone()[0]
    conn.close()
    return {"total_books": count}

@app.get("/totalborrow")
def total_borrowed():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM borrowed_books")
    count = cursor.fetchone()[0]
    conn.close()
    return {"total_borrowed": count}

@app.get("/totalreturn")
def total_returned():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM returned_books WHERE status = 'returned'")
    count = cursor.fetchone()[0]
    conn.close()
    return {"total_returned": count}

# --- USER AUTH ---

class User(BaseModel):
    username: str
    email: str
    password: str

@app.post("/userRegister")
def register_user(obj: User):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        values = (obj.username, obj.email, obj.password)
        cursor.execute(query, values)
        db.commit()
        cursor.close()
        db.close()
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class UserLoginRequest(BaseModel):
    email: str
    password: str

@app.post("/user")
def login_user(obj: UserLoginRequest):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        query = "SELECT username FROM users WHERE email=%s AND password=%s"
        cursor.execute(query, (obj.email, obj.password))
        data = cursor.fetchone()
        cursor.close()
        db.close()

        if data:
            return {"message": "Login successful", "user_name": data[0]}
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- BORROW / RETURN ROUTES ---
class BorrowRequest(BaseModel):
    username: str
    email: str
    book_id: int
    payment: str

@app.post("/borrow/book")
def borrow_book(request: BorrowRequest):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Needed for dictionary access

    try:
        # Get book info
        cursor.execute("SELECT book_name, author_name FROM books WHERE id = %s", (request.book_id,))
        book = cursor.fetchone()
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")

        book_name = book["book_name"]
        author_name = book["author_name"]

        # Insert into borrowed_books
        cursor.execute(
            "INSERT INTO borrowed_books (username, email, book_name, author_name, payment_method) VALUES (%s, %s, %s, %s, %s)",
            (request.username, request.email, book_name, author_name, request.payment)
        )

        # Get the last inserted borrow record (status 'pending')
        cursor.execute(
            "SELECT * FROM borrowed_books WHERE username = %s AND email = %s AND book_name = %s AND status = 'pending' ORDER BY id DESC LIMIT 1",
            (request.username, request.email, book_name)
        )
        borrowed_book = cursor.fetchone()

        # Insert into returned_books
        if borrowed_book:
            cursor.execute("""
                INSERT INTO returned_books (username, email, book_name, author_name, date_borrowed, status)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                borrowed_book["username"],
                borrowed_book["email"],
                borrowed_book["book_name"],
                borrowed_book["author_name"],
                borrowed_book["time_in"],
                "pending"
            ))

        conn.commit()
        return {"message": "Book borrowed successfully!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


@app.get("/user/borrowed-books")
def get_borrowed_books():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM borrowed_books WHERE status = 'pending'")
        borrowed_books = cursor.fetchall()
        conn.commit()
        return borrowed_books
#
    finally:
        cursor.close()
        conn.close()

@app.post("/user/return-book/{book_id}")
def return_book(book_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM borrowed_books WHERE id = %s AND status = 'pending'", (book_id,))
    book = cursor.fetchall()
    if not book:
        conn.close()
        raise HTTPException(status_code=404, detail="Book not found or already returned")

    now = datetime.now()
    cursor.execute(
        "UPDATE borrowed_books SET status = 'returned' WHERE id = %s",
        (book_id,)
    )
    cursor.execute(
        "UPDATE returned_books SET status = 'returned' WHERE id = %s",
        (book_id,)
    )

    conn.commit()
    conn.close()
    return {"message": "Book returned successfully!"}

@app.get("/admin/borrow-history")
def get_borrow_history():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = """
            SELECT id, username, email, book_name, author_name, time_in, status
            FROM borrowed_books
        """
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        db.close()
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/return-history")
def get_return_history():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, username, email, book_name, author_name,date_borrowed,time_out, status FROM returned_books WHERE status='returned'")
    return_history = cursor.fetchall()
    conn.close()
    return return_history