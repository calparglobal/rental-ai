// Vercel Serverless Function - Login API
const bcrypt = require('bcryptjs');
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

export default async function handler(req, res) {
    try {
        const database = await initDB();
        
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        if (req.method === 'POST') {
            const { email, password } = req.body;
            
            // Validation
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }
            
            // For demo purposes, allow simple password 'password' for existing users
            let user;
            
            if (password === 'password') {
                // Demo login - find user by email
                user = await database.getUserByEmail(email);
                if (!user) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
            } else {
                // Regular login - find user and verify password
                user = await database.getUserByEmail(email);
                if (!user) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
                
                // Verify password (for real passwords, not demo)
                if (user.password_hash !== '$2a$10$dummy.hash.here') {
                    const isValidPassword = await bcrypt.compare(password, user.password_hash);
                    if (!isValidPassword) {
                        return res.status(401).json({ error: 'Invalid email or password' });
                    }
                }
            }
            
            // Generate JWT token
            const token = jwt.sign(
                { 
                    userId: user.id, 
                    email: user.email,
                    role: user.role 
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role
                }
            });
            
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Login failed'
        });
    }
}