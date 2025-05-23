const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // load env vars from .env

const app = express();
app.use(cors());

app.get('/api/fantasy/search', async (req, res) => {
  const search = req.query.search;
  const apiKey = process.env.FANTASY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  try {
    const response = await axios.get('https://api-v2.fantasy.top/player/search', {
      params: { search },
      headers: {
        'x-api-key': apiKey,
        'accept': 'application/json',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
