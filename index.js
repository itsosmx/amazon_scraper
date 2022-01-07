const express = require('express');
const request = require('request-promise')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 2001;

const baseURL = `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&autoparse=true`
const amazonUrl = `https://www.amazon.com`



app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello');
})

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(`${baseURL}&url=${amazonUrl}/dp/${productId}`)
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})








