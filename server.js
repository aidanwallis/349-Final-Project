const express = require('express');
const http = require('http');

const app = express();
const port = 3000;



// Start the server
Server.listen(port, () => {
    console.log('Server is running at http://localhost:${port}');
});