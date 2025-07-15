const express = require('express');
const router = express.Router();

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', async (req, res) => {
    try {
        const stats = await req.db.getDashboardStats();
        res.json(stats);
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});

// GET /api/dashboard/recent-activities - Get recent activities
router.get('/recent-activities', async (req, res) => {
    try {
        const sql = `
            SELECT 
                'property' as type,
                p.title as description,
                p.created_at as timestamp,
                'Property listed' as action
            FROM properties p
            ORDER BY p.created_at DESC
            LIMIT 10
        `;
        
        const activities = await req.db.all(sql);
        res.json(activities);
    } catch (error) {
        console.error('Recent activities error:', error);
        res.status(500).json({ error: 'Failed to fetch recent activities' });
    }
});

// GET /api/dashboard/revenue-chart - Get monthly revenue data for charts
router.get('/revenue-chart', async (req, res) => {
    try {
        const sql = `
            SELECT 
                strftime('%Y-%m', payment_date) as month,
                SUM(amount) as revenue
            FROM payments 
            WHERE status = 'completed'
            GROUP BY strftime('%Y-%m', payment_date)
            ORDER BY month DESC
            LIMIT 12
        `;
        
        const revenueData = await req.db.all(sql);
        res.json(revenueData);
    } catch (error) {
        console.error('Revenue chart error:', error);
        res.status(500).json({ error: 'Failed to fetch revenue data' });
    }
});

module.exports = router;