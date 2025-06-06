const express = require('express');
const resultsScraper = require('./scraping/resultsScraper');
const matchesScraper = require('./scraping/matchesScraper');
const rankingScraper = require('./scraping/rankingScraper');
const transfersScraper = require('./scraping/transfScraper');

const app = express();
const PORT = 3000;

app.get('/matches', async (req, res) => {
    try {
        const matches = await matchesScraper();
        res.json(matches);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar partidas.' });
    }
});

app.get('/matches/date', async (req, res) => {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ error: 'Parâmetro "date" é obrigatório no formato YYYY-MM-DD.' });
    }
    try {
        const matches = await matchesScraper(date);
        res.json(matches);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar partidas da data.' });
    }
});

app.get('/results', async (req, res) => {
    try {
        const results = await resultsScraper();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar resultados.' });
    }
});

app.get('/ranking', async (req, res) => {
    try {
        const ranking = await rankingScraper();
        res.json(ranking);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar ranking.' });
    }
});

app.get('/transfers', async (req, res) => {
    try {
        const ranking = req.query.ranking;
        const transfers = await transfersScraper(ranking);
        res.json(transfers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar transferências.' });
    }
});


app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});