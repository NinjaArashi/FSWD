const express = require('express');
const app = express();

// Basic route with URL parameter
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
    const { userId, postId } = req.params;
    res.send(`User ID: ${userId}, Post ID: ${postId}`);
});

// Optional parameters using ?
app.get('/products/:category?', (req, res) => {
    const category = req.params.category || 'all';
    res.send(`Products category: ${category}`);
});

// Query string parameters
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`Search query: ${query}`);
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
