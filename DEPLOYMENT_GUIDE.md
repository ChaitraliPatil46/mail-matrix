# 🚀 Mail Matrix Deployment Guide

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ GitHub account
- ✅ MongoDB Atlas account (free)
- ✅ Google OAuth credentials (optional)

## 🎯 Quick Deployment Options

### **Option 1: Vercel + Render (Recommended)**
- **Frontend**: Vercel (free)
- **Backend**: Render (free tier)
- **Database**: MongoDB Atlas (free tier)

### **Option 2: Railway (All-in-one)**
- **Everything**: Railway ($5 credit/month, usually free)

---

## 🚀 Step-by-Step Deployment

### **Step 1: Prepare Your Code**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/mail-matrix.git
   git push -u origin main
   ```

2. **Create Environment Files**
   ```bash
   # Backend
   cd mailmatrix-backend
   cp env.example .env
   # Edit .env with your MongoDB URI
   
   # Frontend
   cd ../mailmatrix-frontend
   cp env.example .env
   # Will edit this after backend deployment
   ```

### **Step 2: Set Up MongoDB Atlas**

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for free account
   - Choose "Free" tier

2. **Create Database**
   - Click "Build a Database"
   - Choose "FREE" tier
   - Select cloud provider & region
   - Click "Create"

3. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

### **Step 3: Deploy Backend (Render)**

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure settings:
     ```
     Name: mailmatrix-backend
     Root Directory: mailmatrix-backend
     Build Command: npm install
     Start Command: npm start
     ```

3. **Add Environment Variables**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mailmatrix
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy your backend URL (e.g., `https://mailmatrix-backend.onrender.com`)

### **Step 4: Deploy Frontend (Vercel)**

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings:
     ```
     Framework Preset: Create React App
     Root Directory: mailmatrix-frontend
     ```

3. **Add Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Your app is live! 🎉

---

## 🔧 Alternative: Railway Deployment

### **Step 1: Create Railway Account**
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

### **Step 2: Deploy Backend**
1. Click "New Project"
2. Choose "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `mailmatrix-backend`
5. Add environment variables:
   ```
   MONGO_URI=your_mongodb_uri
   NODE_ENV=production
   ```

### **Step 3: Add MongoDB**
1. Click "New" → "Database" → "MongoDB"
2. Connect it to your backend service

### **Step 4: Deploy Frontend**
1. Click "New" → "Service" → "GitHub Repo"
2. Set root directory to `mailmatrix-frontend`
3. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

---

## 🐛 Troubleshooting

### **Common Issues**

1. **CORS Errors**
   ```
   Solution: Update backend CORS settings
   origin: ['https://your-frontend-url.vercel.app']
   ```

2. **Database Connection Failed**
   ```
   Solution: Check MONGO_URI format and network access
   ```

3. **Build Failures**
   ```
   Solution: Check package.json and dependencies
   ```

4. **Environment Variables Not Working**
   ```
   Solution: Restart deployment after adding variables
   ```

### **Debug Steps**

1. **Check Logs**
   - Render: Go to your service → "Logs"
   - Vercel: Go to your project → "Functions" → "Logs"

2. **Test Locally**
   ```bash
   # Test backend
   cd mailmatrix-backend
   npm start
   
   # Test frontend
   cd mailmatrix-frontend
   npm start
   ```

3. **Verify Environment Variables**
   - Check all variables are set correctly
   - Ensure no typos in variable names

---

## 🔒 Security Checklist

- [ ] Environment variables are set
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] CORS is configured for your frontend domain
- [ ] HTTPS is enabled (automatic on Vercel/Render)
- [ ] No sensitive data in code

---

## 📊 Monitoring

### **Vercel Analytics**
- Automatic performance monitoring
- Real user metrics
- Error tracking

### **Render Monitoring**
- Uptime monitoring
- Performance metrics
- Log aggregation

---

## 🎉 Success!

Once deployed, your application will be accessible at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-api.onrender.com`

### **Next Steps**
1. Test all features (login, folders, emails)
2. Set up custom domain (optional)
3. Configure monitoring and alerts
4. Share your app with users!

---

## 🆘 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review deployment logs
3. Test locally first
4. Create an issue on GitHub

**Happy Deploying! 🚀** 