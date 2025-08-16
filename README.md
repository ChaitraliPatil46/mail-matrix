# 📬 Mail Matrix

A modern email organization application that uses AI-powered folders to help you manage your emails efficiently.

## ✨ Features

- 🔐 **Google OAuth Authentication**
- 📁 **AI-Powered Email Organization**
- 🎯 **Smart Folder Creation**
- 📱 **Mobile-Responsive Design**
- ⚡ **Lightning Fast Search**
- 🔍 **Advanced Email Filtering**

## 🏗️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **CSS3** - Custom styling with animations
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Google OAuth** - Authentication

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Google OAuth credentials

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mail-matrix
   ```

2. **Backend Setup**
   ```bash
   cd mailmatrix-backend
   npm install
   cp env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd mailmatrix-frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🌐 Deployment

### Option 1: Vercel + Render (Recommended)

#### Backend Deployment (Render)
1. Create account on [Render](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables:
   ```
   MONGO_URI=your_mongodb_atlas_uri
   NODE_ENV=production
   ```

#### Frontend Deployment (Vercel)
1. Create account on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `mailmatrix-frontend`
4. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
5. Deploy

### Option 2: Railway (All-in-one)

1. Create account on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Deploy both frontend and backend services
4. Add MongoDB plugin
5. Configure environment variables

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
NODE_ENV=production
PORT=5000
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## 📁 Project Structure

```
mail-matrix/
├── mailmatrix-backend/          # Backend API
│   ├── controllers/             # Route controllers
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   ├── utils/                   # Utility functions
│   └── index.js                 # Server entry point
├── mailmatrix-frontend/         # React frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   └── App.js               # Main app component
│   └── package.json
└── README.md
```

## 🔐 Authentication Flow

1. User clicks "Login with Google"
2. Redirected to Google OAuth
3. Google returns authorization code
4. Backend exchanges code for tokens
5. User is authenticated and redirected to dashboard

## 📱 Mobile Responsive

The application is fully responsive and works perfectly on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design
- **Smooth Animations**: Engaging user interactions
- **Dark Mode Support**: Automatic theme detection
- **Accessibility**: WCAG compliant design
- **Performance**: Optimized for fast loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the deployment logs
2. Verify environment variables
3. Test locally first
4. Create an issue on GitHub

## 🎉 Success!

Once deployed, your application will be accessible at:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-api.onrender.com

---

Built with ❤️ for better email management 