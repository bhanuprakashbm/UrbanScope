# UrbanScope Backend Setup Guide

## 🎯 **What You're Setting Up**

A Python Flask backend that runs 3 AI models:
1. **Urban Heat Risk Index** - Heat island analysis
2. **GreenEx_Py** - Green space assessment
3. **Healthcare Analysis** - Facility accessibility

---

## 📋 **Prerequisites**

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

---

## 🚀 **Installation Steps**

### **Step 1: Navigate to Backend Folder**
```bash
cd backend
```

### **Step 2: Create Virtual Environment (Recommended)**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### **Step 3: Install Dependencies**
```bash
pip install -r requirements.txt
```

### **Step 4: Start the Server**
```bash
python app.py
```

You should see:
```
🚀 Starting UrbanScope AI Backend...
📊 AI Models loaded:
  ✅ Urban Heat Risk Index
  ✅ GreenEx_Py
  ✅ Healthcare Analysis

🌐 Server running on http://localhost:5000
```

---

## ✅ **Test the Backend**

### **Option 1: Browser**
Open: `http://localhost:5000/api/health`

Should return:
```json
{
  "status": "healthy",
  "message": "UrbanScope AI Backend is running",
  "timestamp": "2024-10-04T23:11:14"
}
```

### **Option 2: Command Line (PowerShell)**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
```

### **Option 3: Test Heat Risk API**
```powershell
$body = @{
    city = "Delhi"
    coordinates = @(28.7041, 77.1025)
    date = "2024-10-04"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/heat-risk" -Method Post -Body $body -ContentType "application/json"
```

---

## 🔧 **Running Both Frontend & Backend**

### **Terminal 1: Backend**
```bash
cd backend
python app.py
```
Runs on: `http://localhost:5000`

### **Terminal 2: Frontend**
```bash
npm run dev
```
Runs on: `http://localhost:5173`

---

## 📊 **API Endpoints Available**

1. `GET /api/health` - Health check
2. `POST /api/heat-risk` - Heat island analysis
3. `POST /api/green-space` - Green space assessment
4. `POST /api/healthcare-access` - Healthcare facility analysis
5. `POST /api/integrated-analysis` - All 3 models combined

---

## 🐛 **Common Issues**

### **Issue: Port 5000 already in use**
**Solution:**
```python
# In app.py, change:
app.run(port=5001)
```

### **Issue: Module not found**
**Solution:**
```bash
pip install flask flask-cors numpy pandas
```

### **Issue: CORS errors in browser**
**Solution:**
- Make sure Flask server is running
- Check CORS is enabled in app.py
- Verify frontend is calling correct URL

---

## 📝 **Current Status**

✅ **Backend structure created**
✅ **Mock data implemented** (for rapid testing)
✅ **API endpoints ready**
✅ **CORS configured**

⏳ **Next Steps:**
- Integrate actual AI model algorithms
- Add NASA data fetching
- Implement caching
- Add authentication (optional)

---

## 🎯 **For Now (Development)**

The backend uses **mock data** to simulate AI model outputs. This allows you to:
- Test the full application flow
- Build frontend visualizations
- Demo the concept

**Later:** Replace mock data with actual AI model calculations from the 3 projects.

---

## 🌐 **Frontend Integration**

Your React app can now call these APIs using:
```javascript
import { analyzeHeatRisk } from './utils/aiModels';

const result = await analyzeHeatRisk('Delhi', [28.7041, 77.1025]);
console.log(result.data.riskLevel); // "Critical"
```

---

**Backend is ready to run! Start it and test the APIs!** 🚀
