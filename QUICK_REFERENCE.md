# 🚀 UrbanScope - Quick Reference Card

## ⚡ Quick Start Commands

### Development
```bash
# Terminal 1: Backend
cd backend && python app.py

# Terminal 2: Frontend
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| API Health | http://localhost:5000/api/health |

---

## 📡 API Endpoints

### Heat Risk Analysis
```javascript
POST /api/heat-risk
{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "date": "2024-10-04"
}
```

### Green Space Analysis
```javascript
POST /api/green-space
{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "bufferDistance": 500
}
```

### Healthcare Access
```javascript
POST /api/healthcare-access
{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "population": 1500000,
  "driveTimeThreshold": 15
}
```

### Integrated Analysis
```javascript
POST /api/integrated-analysis
{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025]
}
```

### Future Predictions
```javascript
POST /api/predict-future
{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "years": 5
}
```

---

## 🏙️ Available Cities

| City | Country | Coordinates |
|------|---------|-------------|
| Delhi | India | [28.7041, 77.1025] |
| Mumbai | India | [19.0760, 72.8777] |
| New York | USA | [40.7128, -74.0060] |
| London | UK | [51.5074, -0.1278] |
| Tokyo | Japan | [35.6762, 139.6503] |
| São Paulo | Brazil | [-23.5505, -46.6333] |

---

## 🎨 Key Components

### Frontend
```
src/components/
├── UrbanCity3D/          # 3D city visualization
├── SatelliteMap/         # NASA GIBS maps
├── Navbar/               # Navigation
└── ...

src/pages/
├── Home/                 # Landing page
├── NASAData/             # Main analysis
└── About/                # About page
```

### Backend
```
backend/models/
├── heat_risk_enhanced.py      # Heat analysis
├── green_space_enhanced.py    # Green space
├── healthcare_enhanced.py     # Healthcare
└── prediction.py              # Predictions
```

---

## 🔧 Common Tasks

### Add New City
1. Update `backend/models/*_enhanced.py` city databases
2. Add to `CITY_COORDINATES` in `src/utils/aiModels.js`
3. Add to cities array in `src/pages/NASAData/NASAData.jsx`

### Modify AI Model
1. Edit model file in `backend/models/`
2. Restart backend: `python app.py`
3. Test with frontend

### Update 3D Visualization
1. Edit `src/components/3D_Models/UrbanCity3D.jsx`
2. Adjust building generation, colors, or layout
3. Hot reload updates automatically

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check Python version
python --version  # Should be 3.8+

# Reinstall dependencies
pip install -r backend/requirements.txt
```

### Frontend Can't Connect
- Ensure backend is running on port 5000
- Check CORS is enabled in `app.py`
- Verify API URL in `src/utils/aiModels.js`

### 3D Model Not Loading
- Check Three.js dependencies installed
- Open browser console for errors
- Verify `UrbanCity3D` component imported

### Port Already in Use
```bash
# Change backend port in app.py
app.run(port=5001)

# Update frontend API_BASE in aiModels.js
const API_BASE = 'http://localhost:5001/api';
```

---

## 📦 Dependencies

### Frontend Key Packages
- react: ^18.2.0
- three: ^0.164.1
- @react-three/fiber: ^8.16.6
- leaflet: ^1.9.4
- axios: ^1.12.2

### Backend Key Packages
- Flask: 3.0.0
- flask-cors: 4.0.0
- numpy: 1.24.3
- pandas: 2.0.3
- geopandas: 0.14.0

---

## 🎯 Data Sources

| Source | Purpose |
|--------|---------|
| NASA GIBS | Satellite imagery |
| Landsat 8/9 | Temperature data |
| Sentinel-2 | NDVI vegetation |
| OpenStreetMap | Roads, greenspaces |
| GHS-POP | Population data |

---

## 📊 Metrics Explained

### Heat Risk Index (0-10)
- **8-10:** Critical - Immediate action
- **6-8:** High - Warning level
- **4-6:** Moderate - Watch level
- **0-4:** Low - Normal conditions

### Green Space Coverage (%)
- **30%+:** Good (WHO standard)
- **20-30%:** Moderate
- **15-20%:** Poor
- **<15%:** Critical

### Healthcare Access (%)
- **85%+:** Excellent
- **70-85%:** Good
- **50-70%:** Moderate
- **<50%:** Critical

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
# Add Procfile:
web: python backend/app.py
```

---

## 📞 Quick Links

- 📖 Full Docs: `README.md`
- 🧹 Cleanup: `CLEANUP_GUIDE.md`
- ✅ Summary: `IMPLEMENTATION_SUMMARY.md`
- 🤝 Contributing: `contributing.md`

---

**Last Updated:** 2025-10-05
**Version:** 1.0.0 - Enhanced Edition
