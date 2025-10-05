# 🌍 UrbanScope - AI-Powered Urban Health Analysis

[![NASA Space Apps Challenge 2025](https://img.shields.io/badge/NASA%20Space%20Apps-2025-blue)](https://www.spaceappschallenge.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **Data Pathways to Healthy Cities and Human Settlements**

UrbanScope is an advanced web application that leverages NASA Earth observation data and AI-powered analysis to assess urban health indicators, helping city planners and policymakers make data-driven decisions for healthier, more sustainable cities.

![UrbanScope Banner](https://via.placeholder.com/1200x300/1a202c/22c55e?text=UrbanScope+-+AI-Powered+Urban+Health+Analysis)

---

## 🎯 Challenge Overview

This project addresses the **NASA Space Apps Challenge 2025**: *Data Pathways to Healthy Cities and Human Settlements*

### Focus Areas
- 🌡️ **Urban Heat Islands & Air Quality**
- 🌳 **Access to Green Spaces**
- 🏥 **Healthcare Facility Planning**
- 📊 **Environmental Health Indicators**

---

## ✨ Key Features

### 🛰️ Real-Time Satellite Data
- NASA GIBS (Global Imagery Browse Services) integration
- MODIS Land Surface Temperature
- Landsat NDVI vegetation analysis
- Sentinel-5P air quality data

### 🤖 AI-Powered Analysis
1. **Urban Heat Risk Index**
   - Land Surface Temperature analysis
   - Urban Heat Island effect calculation
   - Population vulnerability assessment
   - Heat mitigation recommendations

2. **Green Space Assessment (GreenEx_Py)**
   - NDVI vegetation density mapping
   - Green space availability & accessibility
   - Visibility index calculation
   - Per capita green space analysis

3. **Healthcare Access Analysis**
   - Drive-time isoline generation
   - Population coverage analysis
   - Optimal facility location recommendations
   - Resource gap identification

4. **5-Year Future Predictions**
   - Trend forecasting for heat, green space, and healthcare
   - Intervention impact analysis
   - Strategic planning recommendations

### 🏙️ Interactive 3D Urban Visualization
- Real-time 3D city models
- Dynamic heat distribution visualization
- Green space coverage representation
- Interactive camera controls

### 📈 Comprehensive Metrics
- Real-time risk assessment
- Population impact analysis
- Evidence-based recommendations
- Data-driven insights

---

## 🏗️ Architecture

```
UrbanScope/
│
├── 📁 Frontend (React + Vite + Three.js)
│   ├── src/
│   │   ├── components/
│   │   │   ├── SatelliteMap/          # Leaflet + NASA GIBS
│   │   │   ├── UrbanCity3D/           # Three.js 3D visualization
│   │   │   ├── Navbar/                # Navigation
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home/                  # Landing page
│   │   │   ├── NASAData/              # Main analysis dashboard
│   │   │   └── About/                 # About page
│   │   └── utils/
│   │       └── aiModels.js            # API integration
│   └── public/                        # Static assets
│
├── 📁 Backend (Python Flask)
│   ├── app.py                         # Flask server
│   ├── models/
│   │   ├── heat_risk_enhanced.py     # Enhanced heat analysis
│   │   ├── green_space_enhanced.py   # Enhanced green space
│   │   ├── healthcare_enhanced.py    # Enhanced healthcare
│   │   └── prediction.py             # Future predictions
│   └── requirements.txt               # Dependencies
│
└── 📁 AI Models (Research Projects)
    ├── urban-heat-risk-index-main/    # ArcGIS-based heat analysis
    ├── GreenEx_Py-main/               # Green space exposure
    └── health-care-analysis-master/   # Healthcare accessibility
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm
- **Python** 3.8+
- **Git**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/UrbanScope.git
cd UrbanScope
```

#### 2. Install Frontend Dependencies
```bash
npm install
```

#### 3. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### Running the Application

#### Terminal 1: Start Backend
```bash
cd backend
python app.py
```
**Backend runs on:** `http://localhost:5000`

#### Terminal 2: Start Frontend
```bash
npm run dev
```
**Frontend runs on:** `http://localhost:5173`

### Access the Application
Open your browser and navigate to: **http://localhost:5173**

---

## 📊 How to Use

### 1. Select Data Layer
Choose from:
- 🌡️ **Urban Heat Islands** - MODIS LST data
- 🌳 **Green Space Access** - Landsat NDVI
- 💨 **Air Quality** - Sentinel-5P

### 2. Choose City
Select from major cities:
- New York, USA
- London, UK
- Tokyo, Japan
- Delhi, India
- São Paulo, Brazil
- Mumbai, India

### 3. Load Data
Click **"Load Data"** to:
- View NASA satellite imagery
- See 3D urban visualization
- Get AI-powered analysis
- Receive actionable recommendations

### 4. Explore Results
- 📊 View real-time metrics
- 🗺️ Interact with satellite maps
- 🏙️ Rotate 3D city models
- 📈 Check 5-year predictions
- 💡 Read AI recommendations

---

## 🔬 AI Models & Data Sources

### AI Models
1. **Urban Heat Risk Index**
   - Source: [EsriDE/urban-heat-risk-index](https://github.com/EsriDE/urban-heat-risk-index)
   - Technology: ArcGIS Location Intelligence

2. **GreenEx_Py**
   - Source: [Spatial-Data-Science-and-GEO-AI-Lab/GreenEx_Py](https://github.com/Spatial-Data-Science-and-GEO-AI-Lab/GreenEx_Py)
   - Technology: Sentinel-2, Planetary Computer, OpenStreetMap

3. **Healthcare Analysis**
   - Source: [radoslawkrolikowski/health-care-analysis](https://github.com/radoslawkrolikowski/health-care-analysis)
   - Technology: OSMNX, Openrouteservice API

### Data Sources
- 🛰️ **NASA GIBS** - Global Imagery Browse Services
- 🌍 **NASA EARTHDATA** - Comprehensive Earth science data
- 📡 **Copernicus Sentinel** - European Space Agency satellites
- 🗄️ **Landsat Program** - Long-term Earth observation
- 🗺️ **OpenStreetMap** - Road networks and greenspaces
- 👥 **GHS-POP** - Global Human Settlement population data

---

## 🎨 Technology Stack

### Frontend
- **React** 18.2.0 - UI framework
- **Vite** 5.2.11 - Build tool
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Leaflet** - Interactive maps
- **Axios** - HTTP client
- **Bootstrap** 5.3.2 - UI components

### Backend
- **Flask** 3.0.0 - Web framework
- **NumPy** - Numerical computing
- **Pandas** - Data analysis
- **GeoPandas** - Geospatial data

### APIs
- NASA GIBS API
- NASA EARTHDATA API
- OpenStreetMap API

---

## 📈 API Endpoints

### Health Check
```http
GET /api/health
```

### Heat Risk Analysis
```http
POST /api/heat-risk
Content-Type: application/json

{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "date": "2024-10-04"
}
```

### Green Space Analysis
```http
POST /api/green-space
Content-Type: application/json

{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "bufferDistance": 500
}
```

### Healthcare Access Analysis
```http
POST /api/healthcare-access
Content-Type: application/json

{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "population": 1500000,
  "driveTimeThreshold": 15
}
```

### Integrated Analysis
```http
POST /api/integrated-analysis
Content-Type: application/json

{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025]
}
```

### Future Predictions
```http
POST /api/predict-future
Content-Type: application/json

{
  "city": "Delhi",
  "coordinates": [28.7041, 77.1025],
  "years": 5
}
```

---

## 🎯 Project Impact

### For City Planners
- Identify urban heat hotspots
- Plan green infrastructure investments
- Optimize healthcare facility locations
- Predict future urban health trends

### For Policymakers
- Evidence-based decision making
- Resource allocation optimization
- Climate adaptation strategies
- Public health interventions

### For Researchers
- Urban health data analysis
- Climate change impact assessment
- Environmental justice studies
- Spatial accessibility research

---

## 🛠️ Development

### Project Structure
```
src/
├── components/       # Reusable React components
├── pages/           # Page components
├── utils/           # Utility functions
└── assets/          # Static assets

backend/
├── models/          # AI model implementations
└── app.py          # Flask application
```

### Adding New Cities
1. Update city database in backend models
2. Add coordinates to `CITY_COORDINATES` in `aiModels.js`
3. Update city list in `NASAData.jsx`

### Extending AI Models
1. Create new model file in `backend/models/`
2. Add endpoint in `app.py`
3. Create frontend integration in `utils/aiModels.js`

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](contributing.md) for guidelines.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **NASA** - For providing open Earth observation data
- **ArcGIS** - Urban Heat Risk Index methodology
- **Utrecht University** - GreenEx_Py framework
- **OpenStreetMap** - Community-driven mapping data
- **Space Apps Challenge** - For inspiring this project

---

## 📞 Contact

**UrbanScope Team**

- 🌐 Website: [urbanscope.app](https://urbanscope.app)
- 📧 Email: team@urbanscope.app
- 🐦 Twitter: [@UrbanScopeApp](https://twitter.com/UrbanScopeApp)

---

## 🌟 Star History

If you find UrbanScope useful, please consider giving it a star! ⭐

---

**Built with ❤️ for NASA Space Apps Challenge 2025**

*Making cities healthier, one data point at a time.* 🌍
