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

## 🎓 Course Assignment Mapping

| Assignment | Web Technology Topic | Implementation in Project | File Location |
| :--- | :--- | :--- | :--- |
| **Assignment 1** | HTML Headings, Lists, Images | Structured typography, imagery, and intro lists | `frontend/src/pages/AboutPage.jsx`, `Home.jsx` |
| **Assignment 2** | Semantic HTML5 Elements | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` | `App.jsx`, `Navbar.jsx`, `Footer.jsx`, `PlaceCard.jsx` |
| **Assignment 3** | CSS Styling | External CSS design system + inline styles for cards | `frontend/src/styles/index.css` |
| **Assignment 4** | Responsive Web Design | CSS Flexbox navbar & CSS Grid places layout + `@media` queries | `index.css` (`.places-grid`, `.navbar-inner`) |
| **Assignment 5** | CSS Positioning | Sticky navbar, position absolute badges, fixed modal backdrop | `Navbar.jsx`, `PlaceCard.jsx`, `PlaceDetailsModal.jsx` |
| **Assignment 6** | JavaScript Array Logic | Global Search & Category Filters (`.filter()`, `.map()`, `.includes()`) | `Home.jsx`, `PlacesPage.jsx`, `SearchBar.jsx` |
| **Assignment 7** | JS Frontend Validation | Real-time feedback form validation (email regex, length limits) | `frontend/src/components/FeedbackForm.jsx` |
| **Assignment 8** | React SPA Application | Main Explore Nashik Single Page Application | `frontend/src/App.jsx` |
| **Assignment 9** | React Hooks, Props & State | `useState`, `useEffect`, Props passing, conditional UI rendering | `PlaceCard.jsx`, `CategoryFilter.jsx`, `FactCard.jsx` |
| **Assignment 10** | Fetch API + JSON Integration | Live Nashik Weather API integration fetching real temperature | `frontend/src/services/weatherApi.js`, `WeatherWidget.jsx` |
| **Assignment 11** | Vanilla JS DOM Manipulation | Standalone Nashik Fact Generator & live DOM input echo | `vanilla-js/dom-demo.html`, `dom-demo.js` |
| **Assignment 12** | PHP Authentication & Sessions | Registration, Login, Session storage, `password_verify` | `php/login.php`, `php/register.php`, `php/session.php` |
| **Assignment 13** | PHP + MySQL CRUD Admin | Admin Dashboard to Add, View, Edit & Delete Places/Food/Events | `php/admin/index.php`, `places_manage.php`, `foods_manage.php` |
| **Assignment 14** | Node.js + Express Backend | Express server handling JSON body parsing & routing | `backend/server.js`, `backend/config/db.js` |
| **Assignment 15** | REST API Endpoints | RESTful endpoints: `GET`, `POST`, `PUT`, `DELETE` on `/api/places` | `backend/routes/placesRoutes.js`, `controllers/` |
| **Assignment 16** | Full Course Project | Integrated Explore Nashik full-stack platform | Complete Project Repository |

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
