// Database Connection Config with Mock Fallback (Assignment 14/15)
const mysql = require('mysql2/promise');

let pool = null;
let useMock = false;

// Mock database storage in case MySQL is offline during grading/viva
const mockDb = {
  places: [
    {
      id: 1,
      name: "Pandavleni Caves",
      category: "Historical",
      short_description: "24 ancient Hinayana Buddhist rock-cut caves dating back to the 1st century BCE.",
      full_description: "Pandavleni Caves, also known as Trirashmi Caves, are a group of 24 caves carved between the 1st century BCE and the 3rd century CE. They represent important Buddhist sculpture and architecture, featuring intricate carvings, inscriptions, and water cisterns.",
      historical_significance: "Inscriptions mention donations by Western Satraps and Satavahana rulers.",
      nearby_landmarks: "Trirashmi Hill base, Dadasaheb Phalke Smarak",
      location: "Mumbai Naka, Nashik",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/2-pandavleni-caves-nashik-maharashtra-attr-hero?qlt=82&ts=1726669929981",
      is_hidden_gem: 0
    },
    {
      id: 2,
      name: "Trimbakeshwar Temple",
      category: "Religious",
      short_description: "Ancient Jyotirlinga temple situated at the source of the holy Godavari River.",
      full_description: "Trimbakeshwar is one of the 12 sacred Jyotirlinga shrines of Lord Shiva. Built by Peshwa Balaji Baji Rao in black stone, the temple architecture is renowned for its crown featuring three lingas representing Brahma, Vishnu, and Mahesh.",
      historical_significance: "Key site for Sinhastha Kumbh Mela every 12 years.",
      nearby_landmarks: "Kushavarta Kund, Brahmagiri Hill",
      location: "Trimbak, 28 km from Nashik",
      image: "https://irahotels.com/assets/img/blog/Nashik-Images/Supporting-Blog-6/Trimbakeshwar-Jyotirlinga.webp",
      is_hidden_gem: 0
    },
    {
      id: 3,
      name: "Sula Vineyards",
      category: "Heritage",
      short_description: "Pioneer vineyard of Nashik making the city India's Wine Capital.",
      full_description: "Established in 1999, Sula Vineyards pioneered grape farming and viticulture in Nashik. Nestled among rolling hills and Gangapur Lake backwaters, it showcases sustainable grape harvesting and winemaking heritage.",
      historical_significance: "Helped establish Nashik as the Wine Capital of India.",
      nearby_landmarks: "Gangapur Dam, York Winery",
      location: "Govardhan Village, Nashik",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80",
      is_hidden_gem: 0
    },
    {
      id: 4,
      name: "Ram Kund",
      category: "Religious",
      short_description: "Sacred bathing ghat on the banks of Godavari River in Old Nashik.",
      full_description: "Ram Kund is the central sacred bathing ghat in Panchavati. Legend holds that Lord Rama bathed here during his 14-year exile. It is the core immersion site where millions gather during the holy Sinhastha Kumbh Mela.",
      historical_significance: "Associated with the Ramayana epic and ancestral rituals.",
      nearby_landmarks: "Kalaram Temple, Naroshankar Temple",
      location: "Panchavati, Nashik",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Ramkund_Nashik.jpg",
      is_hidden_gem: 0
    },
    {
      id: 5,
      name: "Anjaneri Hills",
      category: "Adventure",
      short_description: "Spiritual hilltop fort revered as the birthplace of Lord Hanuman.",
      full_description: "Anjaneri is a serene hilltop surrounded by mist and lush greenery. Named after Goddess Anjani, it features ancient Jain temple ruins, a unique footprint-shaped lake, and panoramic views of the Western Ghats.",
      historical_significance: "Revered in Hindu epic history as the birthplace of Lord Hanuman.",
      nearby_landmarks: "Trimbakeshwar Range, Coin Museum",
      location: "Anjaneri, Nashik",
      image: "https://hblimg.mmtcdn.com/content/hubble/img/igatpuri/mmt/activities/m_activities_igatpuri_anjaneri_hills_l_449_599.jpg",
      is_hidden_gem: 1
    },
    {
      id: 6,
      name: "Coin Museum (INORA)",
      category: "Hidden Gems",
      short_description: "Asia's only museum dedicated to Indian numismatics and monetary history.",
      full_description: "Located in the campus of Indian Institute of Research in Numismatic Studies, this hidden gem documents Indian currency evolution from ancient punch-marked coins to colonial coinage through real artifacts, molds, and dioramas.",
      historical_significance: "Preserves over 2,000 years of monetary heritage.",
      nearby_landmarks: "Anjaneri Hill Base",
      location: "Anjaneri, Nashik",
      image: "https://www.trawell.in/admin/images/upload/130704205Nashik_Coin_Museum_Main.jpg",
      is_hidden_gem: 1
    }
  ],
  food: [
    {
      id: 1,
      name: "Nashik Misal Pav",
      category: "Snacks",
      description: "Spicy sprouted moth bean curry topped with farsan, chopped onions, and lemon served with warm pav.",
      popularity_indicator: "Iconic Local Dish",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      name: "Sabudana Vada",
      category: "Traditional",
      description: "Crispy golden tapioca and peanut patties served with chilled sweet curd and spicy green chili chutney.",
      popularity_indicator: "Must Try Snack",
      image: "https://www.cookwithmanali.com/wp-content/uploads/2023/05/Sabudana-Vada-Recipe-Navratri.jpg"
    }
  ],
  events: [
    {
      id: 1,
      name: "Kumbh Mela (Sinhastha)",
      category: "Spiritual",
      description: "One of the world's largest religious gatherings celebrated every 12 years along the Godavari river.",
      event_date: "Every 12 Years (Next: 2027)",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Kumbha_mela_on_ghats_of_the_river_godavari_nashik.jpg"
    },
    {
      id: 2,
      name: "Ram Rath Yatra",
      category: "Cultural",
      description: "Historic procession of decorated wooden chariots carried through Panchavati during Ram Navami.",
      event_date: "March / April (Ram Navami)",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Festival_Chariot%2C_Rath_Yatra%2C_Kaleshwar_Devasthan%2C_Maharashtra.jpg"
    }
  ],
  feedback: []
};

async function initDb() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'explore_nashik',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    // Test connection
    const connection = await pool.getConnection();
    connection.release();
    console.log('✅ Connected to MySQL Database: explore_nashik');
  } catch (err) {
    console.log('⚠️ MySQL Connection failed (using Mock Data Fallback Mode for REST API)');
    useMock = true;
  }
}

initDb();

module.exports = {
  getPool: () => pool,
  isMock: () => useMock,
  mockDb: mockDb
};
