# 🚀 UrbanScope - Complete Startup Guide

## **How to Run the Full Application**

---

## **Step 1: Start the Backend (AI Models)**

### **Open Terminal 1:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**You should see:**
```
🚀 Starting UrbanScope AI Backend...
📊 AI Models loaded:
  ✅ Urban Heat Risk Index
  ✅ GreenEx_Py
  ✅ Healthcare Analysis

🌐 Server running on http://localhost:5000
```

✅ **Backend is running!**

---

## **Step 2: Start the Frontend (React)**

### **Open Terminal 2:**
```bash
npm run dev
```

**You should see:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

✅ **Frontend is running!**

---

## **Step 3: Test the Integration**

### **1. Open Browser:**
Go to: `http://localhost:5173`

### **2. Navigate to NASA Data:**
Click **"NASA Data"** in navbar

### **3. Test AI Analysis:**
1. Select **Dataset**: "MODIS Land Surface Temperature"
2. Select **City**: "Delhi"
3. Click **"Load Data"**

### **4. What You'll See:**
- 🗺️ Interactive satellite map
- 📊 Real-time metrics from AI model:
  - Temperature: 42°C
  - Risk Index: 8.5
  - Risk Level: Critical 🚨
  - Affected Population: 1,275K
- 🤖 AI-Powered Recommendations:
  1. Establish cooling centers immediately
  2. Increase tree canopy by 15%
  3. Implement heat warning system

---

## **🎯 Test Different Scenarios**

### **Scenario 1: Heat Islands (Delhi)**
- Dataset: MODIS Land Surface Temperature
- City: Delhi
- Result: Critical (42°C, Risk 8.5)

### **Scenario 2: Green Spaces (London)**
- Dataset: Vegetation Index (NDVI)
- City: London
- Result: Good (33% coverage, NDVI 0.42)

### **Scenario 3: Compare Cities**
- Try Delhi vs London
- See the difference in metrics

---

## **🔧 Troubleshooting**

### **Backend not starting:**
```bash
# Check Python version
python --version  # Should be 3.8+

# Reinstall dependencies
pip install flask flask-cors numpy pandas
```

### **Frontend can't connect to backend:**
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify CORS is enabled

### **Port conflicts:**
```python
# In backend/app.py, change:
app.run(port=5001)  # Use different port
```

---

## **📊 What's Happening Behind the Scenes**

```
User clicks "Load Data"
        ↓
Frontend calls: POST /api/heat-risk
        ↓
Backend runs AI model
        ↓
Returns: Risk Index, Recommendations
        ↓
Frontend displays: Metrics + Map + Recommendations
```

---

## **✅ Success Checklist**

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Can select city and dataset
- [ ] Click "Load Data" works
- [ ] Metrics display correctly
- [ ] AI recommendations appear
- [ ] Map shows satellite imagery

---

## **🎉 You're Ready!**

Both frontend and backend are integrated and working with AI models!

**Next Steps:**
- Try different cities and datasets
- Explore the AI recommendations
- Check the satellite imagery
- Test on mobile (responsive design)

---

**Have fun exploring UrbanScope with AI-powered insights!** 🌍🤖
