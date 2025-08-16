#!/bin/bash

# 🚀 Mail Matrix Deployment Script
# This script helps you deploy your application to Vercel and Render

echo "🚀 Starting Mail Matrix Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_error "Git repository not found. Please initialize git first:"
    echo "git init"
    echo "git add ."
    echo "git commit -m 'Initial commit'"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

print_status "Step 1: Deploying Backend to Render..."

# Check if backend .env file exists
if [ ! -f "mailmatrix-backend/.env" ]; then
    print_warning "No .env file found in backend. Please create one:"
    echo "cd mailmatrix-backend"
    echo "cp env.example .env"
    echo "# Edit .env with your MongoDB URI and other variables"
    echo ""
    print_status "After creating .env file, run this script again."
    exit 1
fi

print_status "Step 2: Deploying Frontend to Vercel..."

# Check if frontend .env file exists
if [ ! -f "mailmatrix-frontend/.env" ]; then
    print_warning "No .env file found in frontend. Creating one..."
    cd mailmatrix-frontend
    cp env.example .env
    print_status "Please edit mailmatrix-frontend/.env with your backend URL"
    cd ..
fi

print_status "Step 3: Deploying Backend to Render..."

cd mailmatrix-backend

print_status "Please follow these steps to deploy backend:"
echo ""
echo "1. Go to https://render.com"
echo "2. Sign up/Login with GitHub"
echo "3. Click 'New +' → 'Web Service'"
echo "4. Connect your GitHub repository"
echo "5. Configure the service:"
echo "   - Name: mailmatrix-backend"
echo "   - Root Directory: mailmatrix-backend"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "6. Add Environment Variables:"
echo "   - MONGO_URI: your_mongodb_atlas_uri"
echo "   - NODE_ENV: production"
echo "7. Click 'Create Web Service'"
echo ""

read -p "Press Enter when you've deployed the backend and have the URL..."

cd ..

print_status "Step 4: Deploying Frontend to Vercel..."

cd mailmatrix-frontend

# Update .env with backend URL
read -p "Enter your backend URL (e.g., https://mailmatrix-backend.onrender.com): " BACKEND_URL

if [ -n "$BACKEND_URL" ]; then
    # Update .env file
    sed -i "s|REACT_APP_API_URL=.*|REACT_APP_API_URL=$BACKEND_URL|" .env
    print_success "Updated .env with backend URL: $BACKEND_URL"
fi

print_status "Deploying to Vercel..."
vercel --prod

cd ..

print_success "Deployment completed!"
echo ""
print_status "Next steps:"
echo "1. Test your application"
echo "2. Update CORS settings in backend if needed"
echo "3. Monitor logs for any issues"
echo ""
print_status "Your application should now be live!"
echo "Frontend: https://your-app.vercel.app"
echo "Backend: $BACKEND_URL" 