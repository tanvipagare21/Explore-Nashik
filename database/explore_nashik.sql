-- Explore Nashik Database Schema & Seed Data
-- Course Project Web Technology Assignment 26

CREATE DATABASE IF NOT EXISTS explore_nashik;
USE explore_nashik;

-- Table: users
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS places;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: places
CREATE TABLE places (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category ENUM('Historical', 'Religious', 'Nature', 'Heritage', 'Adventure', 'Cultural', 'Hidden Gems', 'Famous Landmarks') NOT NULL,
    short_description TEXT NOT NULL,
    full_description LONGTEXT NOT NULL,
    historical_significance TEXT,
    nearby_landmarks VARCHAR(255),
    location VARCHAR(200) NOT NULL,
    image VARCHAR(500) NOT NULL,
    is_hidden_gem TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: food
CREATE TABLE food (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category ENUM('Snacks', 'Traditional', 'Sweets', 'Street Food', 'Beverage') NOT NULL,
    description TEXT NOT NULL,
    popularity_indicator VARCHAR(100) DEFAULT 'Local Favorite',
    image VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: events
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category ENUM('Spiritual', 'Cultural', 'Festival', 'Music & Heritage') NOT NULL,
    description TEXT NOT NULL,
    event_date VARCHAR(100) NOT NULL,
    image VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: favorites
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    place_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
    UNIQUE KEY user_place_unique (user_id, place_id)
);

-- Table: feedback
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    favorite_place VARCHAR(150),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEED DATA

-- Demo Admin & Users (password for admin is 'admin123' hashed via bcrypt or simple string fallback)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@explorenashik.com', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHe1T6Fbg/u5k6a7Vd2Zz3Jz4H2vK1q0Gy', 'admin'),
('Tanvi Pagare', 'tanvi@example.com', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHe1T6Fbg/u5k6a7Vd2Zz3Jz4H2vK1q0Gy', 'user');

-- Places
INSERT INTO places (name, category, short_description, full_description, historical_significance, nearby_landmarks, location, image, is_hidden_gem) VALUES
('Pandavleni Caves', 'Historical', '24 ancient Hinayana Buddhist rock-cut caves dating back to the 1st century BCE.', 'Pandavleni Caves, also known as Trirashmi Caves, are a group of 24 caves carved between the 1st century BCE and the 3rd century CE. They represent important Buddhist sculpture and architecture, featuring intricate carvings, inscriptions, and water cisterns.', 'Inscriptions mention donations by Western Satraps and Satavahana rulers.', 'Trirashmi Hill base, Dadasaheb Phalke Smarak', 'Mumbai Naka, Nashik', 'https://s7ap1.scene7.com/is/image/incredibleindia/2-pandavleni-caves-nashik-maharashtra-attr-hero?qlt=82&ts=1726669929981', 0),

('Trimbakeshwar Temple', 'Religious', 'Ancient Jyotirlinga temple situated at the source of the holy Godavari River.', 'Trimbakeshwar is one of the 12 sacred Jyotirlinga shrines of Lord Shiva. Built by Peshwa Balaji Baji Rao in black stone, the temple architecture is renowned for its crown featuring three lingas representing Brahma, Vishnu, and Mahesh.', 'Key site for Sinhastha Kumbh Mela every 12 years.', 'Kushavarta Kund, Brahmagiri Hill', 'Trimbak, 28 km from Nashik', 'https://irahotels.com/assets/img/blog/Nashik-Images/Supporting-Blog-6/Trimbakeshwar-Jyotirlinga.webp', 0),

('Sula Vineyards', 'Heritage', 'Pioneer vineyard of Nashik making the city India\'s Wine Capital.', 'Established in 1999, Sula Vineyards pioneered grape farming and viticulture in Nashik. Nestled among rolling hills and Gangapur Lake backwaters, it showcases sustainable grape harvesting and winemaking heritage.', 'Helped establish Nashik as the Wine Capital of India.', 'Gangapur Dam, York Winery', 'Govardhan Village, Nashik', 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80', 0),

('Ram Kund', 'Religious', 'Sacred bathing ghat on the banks of Godavari River in Old Nashik.', 'Ram Kund is the central sacred bathing ghat in Panchavati. Legend holds that Lord Rama bathed here during his 14-year exile. It is the core immersion site where millions gather during the holy Sinhastha Kumbh Mela.', 'Associated with the Ramayana epic and ancestral rituals.', 'Kalaram Temple, Naroshankar Temple', 'Panchavati, Nashik', 'https://upload.wikimedia.org/wikipedia/commons/3/38/Ramkund_Nashik.jpg', 0),

('Anjaneri Hills', 'Adventure', 'Spiritual hilltop fort revered as the birthplace of Lord Hanuman.', 'Anjaneri is a serene hilltop surrounded by mist and lush greenery. Named after Goddess Anjani, it features ancient Jain temple ruins, a unique footprint-shaped lake, and panoramic views of the Western Ghats.', 'Revered in Hindu epic history as the birthplace of Lord Hanuman.', 'Trimbakeshwar Range, Coin Museum', 'Anjaneri, Nashik', 'https://hblimg.mmtcdn.com/content/hubble/img/igatpuri/mmt/activities/m_activities_igatpuri_anjaneri_hills_l_449_599.jpg', 1),

('Coin Museum (INORA)', 'Hidden Gems', 'Asia\'s only museum dedicated to Indian numismatics and monetary history.', 'Located in the campus of Indian Institute of Research in Numismatic Studies, this hidden gem documents Indian currency evolution from ancient punch-marked coins to colonial coinage through real artifacts, molds, and dioramas.', 'Preserves over 2,000 years of monetary heritage.', 'Anjaneri Hill Base', 'Anjaneri, Nashik', 'https://www.trawell.in/admin/images/upload/130704205Nashik_Coin_Museum_Main.jpg', 1),

('Kalaram Temple', 'Heritage', 'Historical black stone temple built in 1782 dedicated to Lord Rama.', 'Built by Sardar Rangarao Odhekar in 1782 using black basalt stone, Kalaram Temple features an impressive 70-feet high structure. Historically, it was also the epicentre of Dr. B.R. Ambedkar\'s 1930 temple entry movement.', 'Pivotal site in India\'s social justice movement.', 'Sita Gufa, Ram Kund', 'Panchavati, Nashik', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80', 0),

('Gangapur Dam & Backwaters', 'Nature', 'Serene earthen dam built across the Godavari River with scenic sunsets.', 'Constructed in 1954, Gangapur Dam is one of India\'s longest earthen dams. The peaceful backwaters offer scenic vistas, birdwatching, and cool lakeside breezes away from city traffic.', 'Crucial water reservoir for Nashik city.', 'Sula Vineyards, MTDC Boat Club', 'Gangapur Road, Nashik', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80', 0),

('Someshwar Waterfall', 'Hidden Gems', 'Picoresque natural waterfall on Godavari river surrounded by greenery.', 'Also known as Dudhsagar Waterfall of Nashik, Someshwar features a 10-meter water drop over basalt rock beds. Located near the ancient Someshwar Shiva Temple, it comes alive during the monsoon season.', 'Ancient temple precinct dedicated to Lord Shiva.', 'Someshwar Temple', 'Gangapur Road, Nashik', 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80', 1),

('Deolali Cantonment', 'Heritage', 'Quiet historic military cantonment established by the British in 1861.', 'Deolali is a peaceful hill town and historic cantonment known for its wide tree-lined avenues, sanatoriums, and historic military infrastructure. The term "Doolally tap" originated here during British rule.', 'Historic 19th-century military health outpost.', 'Temple Hill, Khandoba Temple', 'Deolali, Nashik', 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80', 1);

-- Food
INSERT INTO food (name, category, description, popularity_indicator, image) VALUES
('Nashik Misal Pav', 'Snacks', 'Spicy sprouted moth bean curry topped with farsan, chopped onions, and lemon served with warm pav.', 'Iconic Local Dish', 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1000&q=80'),
('Sabudana Vada', 'Traditional', 'Crispy golden tapioca and peanut patties served with chilled sweet curd and spicy green chili chutney.', 'Must Try Snack', 'https://www.cookwithmanali.com/wp-content/uploads/2023/05/Sabudana-Vada-Recipe-Navratri.jpg'),
('Kondaji Chivda', 'Snacks', 'Famous traditional roasted poha chivda flavored with sesame seeds, raisins, and aromatic spices.', 'Heritage Souvenir', 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80'),
('Solkadhi', 'Beverage', 'Refreshing coastal-style pink digestive drink made from kokum extract and fresh coconut milk.', 'Refreshing Favorite', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80'),
('Fresh Grape Crush & Preserves', 'Sweets', 'Artisanal sweet spread made from freshly harvested organic Nashik table grapes.', 'Agricultural Specialty', 'https://images.unsplash.com/photo-1596368708356-6e1e1025ee73?auto=format&fit=crop&w=1000&q=80');

-- Events
INSERT INTO events (name, category, description, event_date, image) VALUES
('Kumbh Mela (Sinhastha)', 'Spiritual', 'One of the world\'s largest religious gatherings celebrated every 12 years along the Godavari river.', 'Every 12 Years (Next: 2027)', 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Kumbha_mela_on_ghats_of_the_river_godavari_nashik.jpg'),
('Ram Rath Yatra', 'Cultural', 'Historic procession of decorated wooden chariots carried through Panchavati during Ram Navami.', 'March / April (Ram Navami)', 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Festival_Chariot%2C_Rath_Yatra%2C_Kaleshwar_Devasthan%2C_Maharashtra.jpg'),
('SulaFest & Grape Harvest', 'Music & Heritage', 'Annual celebration of music, food, and wine grape harvesting in the hills of Gangapur.', 'February Annually', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80');

-- Seed Feedback
INSERT INTO feedback (name, email, favorite_place, rating, message) VALUES
('Aarav Mehta', 'aarav@example.com', 'Pandavleni Caves', 5, 'Loved learning about the ancient 1st century rock cut architecture of Nashik!'),
('Priya Sharma', 'priya@example.com', 'Sula Vineyards', 5, 'Great cultural guide! The hidden gems section helped us discover the Coin Museum.');
