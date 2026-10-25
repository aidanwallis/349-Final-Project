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


// Socekt.IO integration



////////////
// Routes //
////////////



// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});