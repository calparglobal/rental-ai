// Vercel Serverless Function - Health Check
const Database = require('./database');

let db;

async function initDB() {
    if (!db) {
        db = new Database();
    }
    return db;
}

export default async function handler(req, res) {
    try {
        const database = await initDB();
        
        // Test database connection
        let dbStatus = 'demo';
        let hasPostgres = false;
        
        if (process.env.POSTGRES_URL) {
            hasPostgres = true;
            try {
                // Try to get a user to test connection
                await database.getUserByEmail('test@example.com');
                dbStatus = 'connected';
            } catch (error) {
                console.error('Database connection test failed:', error);
                dbStatus = 'error';
            }
        }
        
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            database: dbStatus,
            hasPostgresUrl: hasPostgres,
            environment: process.env.VERCEL ? 'vercel' : 'local'
        });
    } catch (error) {
        console.error('Health check error:', error);
        res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            database: 'error',
            error: error.message,
            environment: process.env.VERCEL ? 'vercel' : 'local'
        });
    }
}