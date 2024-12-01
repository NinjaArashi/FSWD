const express = require('express');
const app = express();

// Simple middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// Chained middleware example
app.get('/api',
    logger,
    (req, res, next) => {
        req.data = { message: 'Hello' };
        next();
    },
    (req, res) => {
        res.json(req.data);
    }
);

// Abstracted route handler
const handleResource = type => (req, res) => {
    res.json({ message: `${type} endpoint` });
};

app.get('/users', handleResource('Users'));
app.get('/products', handleResource('Products'));

app.listen(3001, () => console.log('Server running'));
