const express = require('express');
const router = express.Router();

// Mock user database
let users = [
    // Pre-populated demo user
    { id: 1, name: 'Demo User', email: 'demo@example.com', password: 'password123' }
];

// Register new user
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password // In production, this should be hashed!
    };

    users.push(newUser);

    // Return user info (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ user: userWithoutPassword, message: 'Registration successful' });
});

// Login user
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return user info (without password)
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, message: 'Login successful' });
});

// Get all users (for admin/debugging)
router.get('/', (req, res) => {
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
});

module.exports = router;
