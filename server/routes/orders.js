const express = require('express');
const router = express.Router();

// Mock Database
let orders = [];

// Get all orders (for admin)
router.get('/', (req, res) => {
    res.json(orders);
});

// Create new order
router.post('/', (req, res) => {
    const { items, total, customer, customerEmail, paymentMethod } = req.body;

    // Generate tracking number
    const trackingNumber = `TRK${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Calculate delivery date (5-7 days from now)
    const deliveryDays = Math.floor(Math.random() * 3) + 5; // Random between 5-7 days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

    const newOrder = {
        id: orders.length + 1,
        items,
        total,
        customer,
        customerEmail: customerEmail || '',
        paymentMethod,
        status: 'Processing', // Initial status
        trackingNumber,
        orderDate: new Date().toISOString(),
        deliveryDate: deliveryDate.toISOString()
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
});

module.exports = router;
