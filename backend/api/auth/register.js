// Vercel Serverless Function - Register API
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
            const { email, password, first_name, last_name, phone, role } = req.body;
            
            // Validation
            if (!email || !password || !first_name || !last_name) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            
            if (password.length < 6) {
                return res.status(400).json({ error: 'Password must be at least 6 characters long' });
            }
            
            // Validate role
            if (!role || !['owner', 'tenant'].includes(role)) {
                return res.status(400).json({ error: 'Valid role (owner or tenant) is required' });
            }
            
            // Check if user already exists
            const existingUser = await database.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
            
            // Hash password
            const saltRounds = 10;
            const password_hash = await bcrypt.hash(password, saltRounds);
            
            // Create user
            const userData = {
                email,
                password_hash,
                first_name,
                last_name,
                phone,
                role
            };
            
            const result = await database.createUser(userData);
            
            // Generate JWT token
            const token = jwt.sign(
                { 
                    userId: result.id, 
                    email: email,
                    role: role 
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: result.id,
                    email,
                    first_name,
                    last_name,
                    role
                }
            });
            
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Registration failed'
        });
    }
}