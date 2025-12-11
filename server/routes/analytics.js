const express = require('express');
const router = express.Router();

// We need access to the orders data. In a real app, this would query the DB.
// For this mock, we'll just import the orders array if it was exported, 
// but since modules are cached, we might need a shared data store file.
// For simplicity, we'll just mock the response here or move data to a shared file later.
// Let's mock the analytics response for now based on "typical" data.

router.get('/', (req, res) => {
    // In a real scenario, calculate from orders DB
    const stats = {
        totalRevenue: 15000,
        totalOrders: 12,
        topSelling: [
            { name: 'Logo Design', sales: 5 },
            { name: 'SEO Audit', sales: 3 }
        ],
        recentOrders: [
            { id: 101, customer: 'John Doe', total: 1500, status: 'Paid' },
            { id: 102, customer: 'Jane Smith', total: 3000, status: 'Paid' }
        ]
    };
    res.json(stats);
});

module.exports = router;
