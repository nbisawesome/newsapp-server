import express from 'express';
import BaseApiRequest from './baseapi.js';
import cors from 'cors';
const app = express();

cors({ origin: '*' });

app.use(cors());

const port = process.env.PORT || 3000;
const BASE_URL = 'https://newsapi.org/v2';
const api = new BaseApiRequest(BASE_URL);

async function getLatestNews(apiKey) {
    const endpoint = `top-headlines?country=us&apiKey=${apiKey}`;
    const data = await api.get(endpoint);
    return data;
}

async function getNewsByCategory(category, apiKey) {
    const endpoint = `top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    const data = await api.get(endpoint);
    return data;
}
app.get('/latest-news', async (req, res) => {
    try {
        const apiKey = req.query.apiKey;
        console.log('API Key:', apiKey);
        const news = await getLatestNews(apiKey);
        res.json(news);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/news-by-category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const apiKey = req.query.apiKey;
        const news = await getNewsByCategory(category, apiKey);
        res.json(news);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
