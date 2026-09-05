# ☀️ SolarIQ - Smart Solar Energy Forecasting & Insights Dashboard


### Live: [View live](https://solariq-live.vercel.app/)
---

A smart solar energy prediction and monitoring system using machine learning to optimize solar panel performance and provide actionable insights.

**Key Features:**
- 90% prediction accuracy for solar energy output
- Real-time monitoring and analytics dashboard
- Predictive maintenance alerts
- ML-powered recommendations
- 24/7 monitoring

---

## 🛠️ Tech Stack

**Frontend:** React.js, Vite, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MySQL  
**ML:** Python (Prediction API)  

---

## 👥 Team

- Irfaan Patel
- Abrar Khatri
- Atharv Sawant
- Mohseen Hawaldar

---

## �📦 Installation

### Prerequisites
- Node.js v18+
- Python 3.8+
- MongoDB or MySQL

### Quick Setup
```bash
# Clone repository
git clone <repository-url>
cd SolarIQ

# Frontend
cd client && npm install && cd ..

# Backend
cd server && npm install && cd ..

# ML Server
cd ml && pip install -r requirements.txt
```

---

## 🚀 Running the Project

### Start Frontend
```bash
cd client
npm run dev
# http://localhost:5173
```

### Start Backend
```bash
cd server
npm run dev
# http://localhost:5000
```

### Start ML Server
```bash
cd ml
python ml_server.py
# http://localhost:5001
```

---

## 🔧 Environment Configuration

### Backend (.env)
```env
PORT=
NODE_ENV=
MONGODB_URI=
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
JWT_EXPIRE=
ML_SERVER_URL=
```

### Frontend (.env)
```env
VITE_API_URL=
VITE_ML_API_URL=
```

### ML Server (.env)
```env
FLASK_ENV=
PORT=
MODEL_PATH=
DEBUG=
```

---

##  Project Structure

```
SolarIQ/
├── client/          # React Frontend
├── server/          # Express Backend
├── ml/              # Python ML Server
└── README.md
```

For detailed documentation, see [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## ⚠️ Troubleshooting

**Port already in use:**
```bash
# Kill process on port
# Windows: netstat -ano | findstr :5000 → taskkill /PID <PID> /F
# Linux/Mac: lsof -i :5000 → kill -9 <PID>
```

**Module not found:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Database connection error:**
- Ensure MySQL is running
- Check connection string in .env file

---

**Made with ❤️ by SolarIQ Team**
