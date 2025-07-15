// Vercel Serverless Function - Profile API
const jwt = require('jsonwebtoken');
const PostgresDatabase = require('../../database/postgres');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

let db;

async function initDB() {
    if (!db) {
        db = new PostgresDatabase();
    }
    return db;
}

// Middleware to authenticate JWT token
function authenticateToken(req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        throw new Error('Access token required');
    }
    
    try {
        const user = jwt.verify(token, JWT_SECRET);
        return user;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
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
            // Authenticate token
            const tokenUser = authenticateToken(req);
            
            // Get fresh user data from database
            const user = await database.query('SELECT id, email, first_name, last_name, phone, role, created_at FROM users WHERE id = $1', [tokenUser.userId]);
            
            if (!user.rows || user.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            res.status(200).json(user.rows[0]);
            
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
        
    } catch (error) {
        console.error('Profile API error:', error);
        
        if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ 
                error: 'Internal server error',
                message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
            });
        }
    }
}