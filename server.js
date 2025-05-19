const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/fantasy/search', async (req, res) => {
  const search = req.query.search;
  try {
    const response = await axios.get('https://api-v2.fantasy.top/player/search', {
      params: { search },
      headers: {
        'x-api-key': '13a14f68-1d83-4192-98fb-ba7b608068e0',
        'accept': 'application/json',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Proxy running on http://localhost:3001'));
