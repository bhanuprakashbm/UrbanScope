# UrbanScope Backend - AI Models API

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Server
```bash
python app.py
```

Server will start at: `http://localhost:5000`

---

## 📡 API Endpoints

### **Health Check**
```
GET /api/health
```
Returns server status

### **Heat Risk Analysis**
```
POST /api/heat-risk
Content-Type: application/json

{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "date": "2024-10-04"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "riskIndex": 8.5,
    "riskLevel": "Critical",
    "temperature": 42,
    "affectedPopulation": 1275000,
    "recommendations": [...]
  }
}
```

### **Green Space Analysis**
```
POST /api/green-space
Content-Type: application/json

{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "bufferDistance": 500
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "meanNDVI": 0.18,
    "greenspaceCoverage": 12.5,
    "distanceToNearestPark": 850,
    "status": "Critical",
    "recommendations": [...]
  }
}
```

### **Healthcare Access Analysis**
```
POST /api/healthcare-access
Content-Type: application/json

{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "population": 1500000,
  "driveTimeThreshold": 15
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "facilitiesCount": 45,
    "populationWithAccess": 65,
    "populationWithoutAccess": 35,
    "recommendedLocations": [...],
    "recommendations": [...]
  }
}
```

### **Integrated Analysis (All 3 Models)**
```
POST /api/integrated-analysis
Content-Type: application/json

{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "heatRisk": {...},
    "greenSpace": {...},
    "healthcare": {...},
    "recommendations": [...],
    "overallScore": 45.2
  }
}
```

---

## 🧠 AI Models Integrated

1. **Urban Heat Risk Index** - Heat island analysis
2. **GreenEx_Py** - Green space assessment
3. **Healthcare Analysis** - Facility accessibility

---

## 📁 Project Structure

```
backend/
├── app.py                  # Flask server
├── models/
│   ├── heat_risk.py       # Heat risk calculations
│   ├── green_space.py     # Green space analysis
│   └── healthcare.py      # Healthcare access
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

---

## 🔧 Development Notes

**Current Status:** Using mock data for rapid prototyping

**Next Steps:**
1. Integrate actual GreenEx_Py functions
2. Add Urban Heat Risk Index calculations
3. Connect Healthcare Analysis model
4. Add NASA data fetching
5. Implement caching for performance

---

## 🌐 CORS Configuration

CORS is enabled for all origins in development.
For production, update to specific frontend URL.

---

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change port in app.py
app.run(port=5001)
```

**Module not found:**
```bash
pip install -r requirements.txt
```

**CORS errors:**
- Make sure Flask server is running
- Check frontend is calling correct URL
