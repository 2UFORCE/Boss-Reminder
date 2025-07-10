const express = require('express');
const app = express();

app.use(express.json()); // Para parsear o corpo das requisições JSON

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Boss Remainder Backend API is running!');
});

app.post('/api/send-alert', (req, res) => {
    const { bossId, time, message } = req.body;
    console.log('Alerta recebido:', { bossId, time, message });
    res.status(200).json({ message: 'Alerta recebido com sucesso!' });
});

module.exports = app;