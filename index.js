const express = require('express');
const request = require('request-promise')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 2001;

// const userAPIKey(api_key) = `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&autoparse=true`
const amazonUrl = `https://www.amazon.com`



app.use(express.json());


const userAPIKey = (api_key) => { return `http://api.scraperapi.com?api_key=${api_key}&autoparse=true` }

app.get('/', (req, res) => {
  res.json('Hello World');
})

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(`${userAPIKey(api_key)}&url=${amazonUrl}/dp/${productId}`)
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(`${userAPIKey(api_key)}&url=${amazonUrl}/product-reviews/${productId}`)
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

app.get('/search/:query', async (req, res) => {
  const { query } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(`${userAPIKey(api_key)}&url=${amazonUrl}/s?k=${query}`)
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})








