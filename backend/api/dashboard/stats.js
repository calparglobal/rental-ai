// Vercel Serverless Function - Dashboard Stats API
const PostgresDatabase = require('../../database/postgres');

let db;

async function initDB() {
    if (!db) {
        db = new PostgresDatabase();
    }
    return db;
}

export default async function handler(req, res) {
    try {
        const database = await initDB();
        
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        if (req.method === 'GET') {
            const stats = await database.getDashboardStats();
            res.status(200).json(stats);
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
        
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch dashboard stats',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
        });
    }
}