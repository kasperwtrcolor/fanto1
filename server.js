const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // load env vars from .env

const app = express();
app.use(cors());

const API_KEY = process.env.FANTASY_API_KEY;

if (!API_KEY) {
  console.error('FANTASY_API_KEY is not defined in .env');
  process.exit(1);
}

// === 1. PLAYER SEARCH ===
app.get('/api/fantasy/search', async (req, res) => {
  const search = req.query.search;

  try {
    const response = await axios.get('https://api-v2.fantasy.top/player/search', {
      params: { search },
      headers: {
        'x-api-key': API_KEY,
        'accept': 'application/json',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === 2. HERO SEARCH BY NAME ===
app.get('/api/fantasy/hero', async (req, res) => {
  const name = req.query.name;

  try {
    const response = await axios.get('https://api-v2.fantasy.top/hero/search/name', {
      params: { name },
      headers: {
        'x-api-key': API_KEY,
        'accept': 'application/json',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === 3. HERO BY HANDLE (With Selected Fields) ===
app.get('/api/fantasy/hero/handle', async (req, res) => {
  const handle = req.query.handle;

  try {
    const response = await axios.get('https://api-v2.fantasy.top/hero/get-hero-by-handle', {
      params: { handle },
      headers: {
        'x-api-key': API_KEY,
        'accept': 'application/json',
      },
    });

    const hero = response.data;

    // Pick only relevant fields
    const filtered = {
      name: hero.name,
      handle: hero.handle,
      fantasy_score: hero?.current?.fantasy_score || 0,
      rarity_picture: hero?.cards?.[0]?.picture_url || null
    };

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Fantasy proxy running at http://localhost:${PORT}`));
