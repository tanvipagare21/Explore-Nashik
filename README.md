# EXPLORE NASHIK — Discover the City Beyond the Tourist Spots
> **B.Tech Web Technology Course Project (Assignments 1 – 16)**

Explore Nashik is a modern, responsive full-stack web application designed to help users discover the rich history, sacred riverfronts, ancient Buddhist caves, wine viticulture heritage, local culinary delicacies, living culture, and hidden offbeat spots of Nashik, Maharashtra.

---

## 📌 Core Concept & Rules
- **Digital City Discovery Platform**: Focuses strictly on city discovery, historical stories, cultural identity, local gastronomy, and hidden gems.
- **NO Trip Planning**: Contains **zero** itinerary creation, day-wise planning, hotel booking, cab booking, or tour booking.

---

## 🛠️ Technology Stack
1. **Frontend**: React 18 (Vite SPA), JSX, Custom CSS Tokens, Flexbox & Grid, CSS Positioning, Lucide Icons.
2. **Backend API**: Node.js, Express.js, CORS, RESTful API endpoints with automatic mock database fallback.
3. **Authentication & Admin**: PHP 8 (Sessions, Password Hashing) + MySQL Database.
4. **DOM Manipulation**: Vanilla JavaScript (`dom-demo.html` / `dom-demo.js`).
5. **Live Data Integration**: Open-Meteo REST API for live Nashik meteorological data.

---

## 📂 Project Directory Structure

```text
WTL Project/
├── frontend/                     # React SPA (Assignments 8, 9, 10)
│   ├── src/
│   │   ├── components/           # Navbar, Hero, PlaceCard, Modal, Weather, Feedback, Footer
│   │   ├── pages/                # Home, Places, HiddenGems, Stories, Food, Events, MyDiscoveries, About
│   │   ├── data/                 # Seed datasets (places, foods, events, stories, facts)
│   │   ├── services/             # REST API & Weather Fetchers
│   │   ├── styles/               # index.css (Design system & breakpoints)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Node.js + Express REST API (Assignments 14, 15)
│   ├── config/db.js              # MySQL connection pool + Mock fallback
│   ├── controllers/              # REST controllers for places, foods, events, feedback
│   ├── routes/                   # Express API routes (/api/*)
│   ├── server.js                 # Express server entrypoint
│   └── package.json
│
├── php/                          # PHP Sessions & Admin Dashboard (Assignments 12, 13)
│   ├── config/db.php
│   ├── css/admin.css
│   ├── admin/                    # Admin CRUD (places_manage.php, foods_manage.php, events_manage.php)
│   ├── login.php
│   ├── register.php
│   ├── logout.php
│   └── session.php
│
├── database/                     # MySQL Database Schema & Seed Script (Assignment 26)
│   └── explore_nashik.sql
│
├── vanilla-js/                   # Vanilla JS DOM Manipulation Demo (Assignment 11)
│   ├── dom-demo.html
│   └── dom-demo.js
│
└── README.md                     # Documentation & Setup Guide
```

---

## 🚀 How to Run the Project

### 1. Database Setup (MySQL)
1. Open XAMPP / WAMP / MySQL Server.
2. Create database `explore_nashik` or import `database/explore_nashik.sql`:
   ```bash
   mysql -u root -p explore_nashik < database/explore_nashik.sql
   ```

---

### 2. Run React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open browser at `http://localhost:3000`

---

### 3. Run Node.js + Express REST API
```bash
cd backend
npm install
npm start
```
REST API runs on `http://localhost:5001` (or `http://localhost:5000` if AirPlay Receiver is disabled).

---

### 4. Run PHP Admin Dashboard & Session Auth
1. Place the `php/` directory inside your XAMPP `htdocs/` folder (e.g. `htdocs/explore-nashik/php`).
2. Open `http://localhost/explore-nashik/php/login.php` in your browser.
3. **Demo Admin Credentials**:
   - **Email**: `admin@explorenashik.com`
   - **Password**: `admin123`

---

### 5. Run Vanilla JS DOM Demo (Assignment 11)
- Open `vanilla-js/dom-demo.html` directly in any web browser or host it via Live Server.

---

## 📡 Node.js REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/places` | Retrieve list of all Nashik places |
| `GET` | `/api/places/:id` | Get details of a single place by ID |
| `POST` | `/api/places` | Create a new place record |
| `PUT` | `/api/places/:id` | Update existing place record |
| `DELETE` | `/api/places/:id` | Delete place record |
| `GET` | `/api/foods` | Get all food items |
| `GET` | `/api/events` | Get all cultural events |
| `GET` | `/api/weather` | Live Nashik weather data proxy |
| `POST` | `/api/feedback` | Submit user feedback |
