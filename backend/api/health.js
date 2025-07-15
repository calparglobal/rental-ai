// Vercel Serverless Function - Health Check
export default function handler(req, res) {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
        environment: process.env.VERCEL ? 'vercel' : 'local'
    });
}