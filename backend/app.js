const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'https://classy-tiramisu-46fafa.netlify.app' // Replace with your frontend's domain
}));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    });
};

server();