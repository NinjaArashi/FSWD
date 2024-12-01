const express = require('express');
const app = express();

// Custom middleware function
const customMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // Add a custom property to the request object
    req.customData = 'This data was added by middleware';
    next(); // Call next() to pass control to the next middleware/route handler
};

// Apply middleware to all routes
app.use(customMiddleware);

// Example route using the middleware
app.get('/', (req, res) => {
    res.send({
        message: 'Hello from Express!',
        customData: req.customData
    });
});

// Error handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
