# 🏠 Rental AI - Property Management Platform

A modern, AI-powered rental management platform built with Node.js, PostgreSQL, and deployed on Vercel.

## 🚀 Features

- **Property Management** - List, search, and manage rental properties
- **User Management** - Property owners, tenants, and admin roles
- **Dashboard Analytics** - Real-time statistics and insights
- **PostgreSQL Database** - Robust data storage with Vercel Postgres
- **RESTful API** - Clean, documented API endpoints
- **Serverless Architecture** - Auto-scaling with Vercel Functions

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (FlowDash template)
- **Backend**: Node.js, Express.js (Serverless Functions)
- **Database**: PostgreSQL (Vercel Postgres)
- **Deployment**: Vercel
- **Authentication**: JWT tokens
- **ORM**: Native PostgreSQL queries

## 📋 API Endpoints

### Properties
- `GET /api/properties` - List all properties
- `GET /api/properties/[id]` - Get single property
- `POST /api/properties` - Create new property
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Health
- `GET /api/health` - Health check endpoint

## 🚀 Deployment to Vercel

### Step 1: Login to Vercel
\`\`\`bash
npx vercel login
\`\`\`
Choose your preferred login method (GitHub recommended).

### Step 2: Deploy the Project
\`\`\`bash
cd "/Users/alishahbas/Documents/Projects/Rental AI /rental-ai"
npx vercel
\`\`\`

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → rental-ai (or your choice)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

### Step 3: Set Up Vercel Postgres

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your deployed project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a database name: \`rental-ai-db\`
7. Click **Create**

The database will be automatically connected to your project!

### Step 4: Production Deployment
\`\`\`bash
npx vercel --prod
\`\`\`

## 🗄️ Database Schema

The PostgreSQL database includes these tables:
- **users** - Property owners, tenants, admins
- **properties** - Rental property listings
- **applications** - Rental applications from tenants
- **leases** - Active rental agreements
- **payments** - Rent payment tracking
- **maintenance_requests** - Property maintenance system

## 🔧 Local Development

### Prerequisites
- Node.js 18+ installed
- PostgreSQL installed (optional - uses SQLite for local dev)

### Setup
\`\`\`bash
# Install dependencies
npm install

# Start local development server
npm run dev
\`\`\`

Visit: http://localhost:3000

## 📱 Sample Data

The database comes pre-populated with:
- **3 Users**: Owner, Tenant, Admin
- **2 Properties**: SF Apartment ($3,500), Berkeley Studio ($1,800)

## 🔐 Environment Variables

### Required for Production:
- \`JWT_SECRET\` - JWT signing secret
- \`POSTGRES_URL\` - Automatically provided by Vercel Postgres

### Optional:
- \`NODE_ENV\` - Environment (development/production)
- \`CORS_ORIGIN\` - CORS allowed origins

## 🏃‍♂️ Quick Start

1. **Deploy to Vercel** (5 minutes)
2. **Add Postgres Database** (2 minutes)
3. **Visit your live app** - Your app will be at: \`https://your-project.vercel.app\`

## 📊 Live URLs

After deployment, your app will be available at:
- **Frontend Dashboard**: \`https://your-project.vercel.app\`
- **API Health Check**: \`https://your-project.vercel.app/api/health\`
- **Properties API**: \`https://your-project.vercel.app/api/properties\`

## 🎯 Next Steps

1. **Custom Domain** - Add your own domain in Vercel dashboard
2. **AI Features** - Integrate OpenAI for rent predictions
3. **Authentication** - Add login/signup to the frontend
4. **File Uploads** - Add property image uploads
5. **Payment Processing** - Integrate Stripe for rent payments

## 🆘 Troubleshooting

### Database Connection Issues
- Make sure Vercel Postgres is created and connected
- Check environment variables in Vercel dashboard

### API Errors
- Check function logs in Vercel dashboard
- Verify database schema is initialized

### Deployment Issues
- Ensure all dependencies are in package.json
- Check build logs in Vercel dashboard

## 📞 Support

Your rental AI platform is ready for production! 🎉

Built with ❤️ using Vercel, PostgreSQL, and Node.js.