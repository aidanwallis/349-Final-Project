const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection


// Socket.IO integration



////////////
// Routes //
////////////

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