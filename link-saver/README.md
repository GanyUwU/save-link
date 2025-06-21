# 🔗 Linkify - Smart Link Saver with AI Tagging & Summarization

Linkify is a full-stack web app built with **FastAPI**, **React**, and **PostgreSQL** that lets you save, view, and manage links with AI-powered summaries and content categorization. It also includes features like image previews, tagging, filtering, dark mode, and responsive UI.

---

##  Features

-  Parses links using Open Graph metadata
-  Summarizes content and auto-tags it using Gemini
-  Saves links to PostgreSQL per user
-  Theme toggle (dark/light mode)
-  Responsive grid UI for displaying links
-  Filter by content type (Video, Blog, News, etc.)
-  JWT-based user authentication
-  Clean REST API with Swagger docs

---

## ⚙️ Tech Stack

- **Backend**: FastAPI, PostgreSQL, SQLAlchemy, Pydantic
- **Frontend**: React + TailwindCSS
- **AI**: Gemini (configurable)
- **Auth**: JWT-based login/signup
- **Parser**: Requests + BeautifulSoup

---

##  Local Setup Instructions

###  1. Clone the repository

```bash
git clone https://github.com/GanyUwU/save-link.git
cd link-saver
```

### 2. Backend Setup (Python + FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate 
pip install -r requirements.txt
```
  ### Set up environment variables
```bash
DATABASE_URL=[YOUR DATABASE URL}
SECRET_KEY ={JWT Secret}
ALGORITHM =[Algorith-sha]
GEMINI_API_KEY=[Your Gemini API key]
```


### 3. Setup Database PostgreSQL
This project uses PostgreSQL as its database. Follow the steps below to install and configure it before running the backend.

### i . Install PostgreSQL

- Download and install PostgreSQL for your OS from the official site: https://www.postgresql.org/download/
- During setup you’ll be prompted to choose:
  - **Username** (default: `postgres`)  
  - **Password** (e.g. `postgres`)  

### ii . Create a new database

Once installed, open a terminal (or pgAdmin) and run:

```sql
CREATE DATABASE link_saver;
```
### Run backend 
```bash
uvicorn backend.main:app --reload
```

### 4. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```



