const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const Rating = require('./models/Rating'); // Import the Rating model


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/gameRatingDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection failed:', err));

// Socket.IO integration



////////////
// Routes //
////////////

// Get every rating in the database.
app.get('/api/ratings', async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.json(ratings);
    } catch (error) {
        console.error('Failed to get ratings:', error);
        res.status(500).json({ error: 'Failed to get ratings' });
    }
});

app.get('/api/ratings/:id', async (req, res) => {
    try {
        const rating = await Rating.findById(req.params.id);
        if (!rating) {
            return res.status(404).json({ error: 'Cannot find rating for id' });
        }
        res.json(rating);
    } catch (error) {
        console.error('Failed to get rating:', error);
        res.status(400).json({ error: 'Cannot find id' });
    }
});


// Steam Web API

// Search for a game on Steam using the games name as a search term. 
// Returns a list of games that match the search term.
app.get('/api/storesearch', async (req, res) => {
    const term = req.query.term;

    if (typeof term !== 'string' || !term.trim()) {
        return res.status(400).json({error: 'No search term provided.'});
    }

    const params = new URLSearchParams({
        term: term.trim(),
        l: 'english',
        cc: 'US'
    });

    try {
        const steamResponse = await fetch(
          `https://store.steampowered.com/api/storesearch/?${params}`
        );

        if (!steamResponse.ok) {
            console.error(`Steam API returned ${steamResponse.status}`);
            return res.status(502).json({error: 'Failed to fetch Steam search results.'});
        }

        const data = await steamResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Failed to fetch Steam search:', error);
        res.status(502).json({error: 'Failed to fetch Steam search results.'});
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});