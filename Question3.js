// Import the Express framework
const express = require('express');

// Create an Express application instance
const app = express();

// Define port number
const port = 8000;

// Handle GET request for root URL (/)
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// Handle GET request for /about URL
app.get('/about', (req, res) => {
    res.send('This is the About Page');
});

// Start the server
app.listen(3001, () => {
    console.log(`Server is running on http://localhost:${3001}`);
});
