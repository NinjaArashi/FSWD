const express = require('express');
const router = express.Router();

// GET all users
router.get('/users', (req, res) => {
    try {
        // Add your logic to fetch all users from database
        const users = JSON.parse(fs.readFileSync('users.json', 'utf-8')); // Read user data from file
        res.status(200).json(users)
        res.status(200).json({ message: 'Get all users' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET user by ID
router.get('/users/:id', (req, res) => {
    try {
        const userId = req.params.id;
        // Add your logic to fetch specific user from database
        res.status(200).json({ message: `Get user with ID: ${userId}` });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST new user
router.post('/users', (req, res) => {
    try {
        const userData = req.body;
        // Add your logic to create new user in database
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE user by ID
router.delete('/users/:id', (req, res) => {
    try {
        const userId = req.params.id;
        // Add your logic to delete user from database
        res.status(200).json({ message: `User with ID: ${userId} deleted` });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
