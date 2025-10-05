# UrbanScope: AI Models, Datasets & Visualization Analysis

## 📊 Overview
UrbanScope integrates **3 core AI models** with **NASA Earth observation data** to provide comprehensive urban health analysis through interactive visualizations.

---

## 🤖 AI Models Used

### 1. **Urban Heat Risk Index Model**
**Location:** `backend/models/heat_risk_enhanced.py`

**Based on:** [EsriDE/urban-heat-risk-index](https://github.com/EsriDE/urban-heat-risk-index)

#### Algorithm
```python
HRI = (0.5 × temp_normalized) + (0.3 × population_density_normalized) - (0.2 × tree_coverage_normalized)
```

#### Input Parameters
- **Land Surface Temperature (LST)** - From Landsat 8/9 thermal bands
- **Population Density** - From GHS-POP (Global Human Settlement Population)
- **Tree Canopy Coverage** - From ESA WorldCover dataset

#### Outputs
- Heat Risk Index (0-10 scale)
- Risk Level: Critical/High/Moderate/Low
- Urban Heat Island (UHI) Effect (°C)
- Affected Population (vulnerable groups)
- Cooling Potential Analysis
- Evidence-based Recommendations

#### Key Features
- Identifies vulnerable populations (elderly, children, outdoor workers)
- Calculates potential temperature reduction with interventions
- Generates heat mitigation strategies
- Assesses emergency cooling center needs

---

### 2. **GreenEx_Py - Green Space Exposure Model**
**Location:** `backend/models/green_space_enhanced.py`

**Based on:** [Spatial-Data-Science-and-GEO-AI-Lab/GreenEx_Py](https://github.com/Spatial-Data-Science-and-GEO-AI-Lab/GreenEx_Py)

#### Three-Perspective Analysis

**A. Availability**
- NDVI (Normalized Difference Vegetation Index) analysis
- Total green space coverage (%)
- Number of parks and green areas
- Tree canopy coverage

**B. Accessibility**
- Distance to nearest park/green space
- WHO recommendation: <300m (5-minute walk)
- Population within 500m buffer
- Accessibility score (0-100)

**C. Visibility**
- Green Visibility Index (GVI)
- Street-level greenery perception
- Visual exposure to vegetation

#### Data Sources
- **Sentinel-2** - NDVI vegetation analysis (10m resolution)
- **ESA WorldCover** - Land cover classification
- **OpenStreetMap** - Park locations and boundaries
- **Planetary Computer** - Cloud-based geospatial processing

#### Outputs
- Mean NDVI value and category
- Green space coverage percentage
- Per capita green space (m²/person)
- Accessibility level and score
- Gap analysis (current vs. WHO target of 30%)
- Park creation recommendations

---

### 3. **Healthcare Facility Access Analysis Model**
**Location:** `backend/models/healthcare_enhanced.py`

**Based on:** [radoslawkrolikowski/health-care-analysis](https://github.com/radoslawkrolikowski/health-care-analysis)

#### Methodology

**A. Facility Mapping**
- Primary care centers
- Hospitals
- Emergency centers
- Specialist facilities

**B. Drive-Time Isoline Analysis**
- 5-minute access zones
- 10-minute access zones
- 15-minute access zones (WHO standard)

**C. Population Overlay**
- Population within service areas
- Underserved population identification
- Coverage percentage calculation

**D. Resource Assessment**
- Beds per 1,000 population
- Doctors per 1,000 population
- Facilities per 100,000 population

#### Data Sources
- **healthsites.io** - Healthcare facility locations
- **GHS-POP** - Population distribution
- **OpenStreetMap** - Road networks
- **GADM** - Administrative boundaries
- **Openrouteservice API** - Drive-time calculations

#### Outputs
- Access percentage (5/10/15 minutes)
- Underserved population count
- Facility density metrics
- Resource gap analysis (beds, doctors, facilities)
- Optimal new facility locations
- Quality score (0-100)

---

### 4. **5-Year Prediction Model**
**Location:** `backend/models/prediction.py`

#### Prediction Methodology

**A. Trend Analysis**
- Heat Risk: 8% annual increase (without intervention)
- Green Space: 3% annual decline (urbanization effect)
- Healthcare Access: 2% annual improvement (natural growth)

**B. Impact Assessment**
- Percent change calculations
- Severity classification
- Population impact projections

**C. Intervention Modeling**
- Cost-benefit analysis
- Expected outcomes
- Timeline recommendations

#### Outputs
- Year-by-year predictions (5 years)
- Impact scores and severity levels
- Future affected population estimates
- Prioritized recommendations with:
  - Timeframe (immediate/short/medium/long-term)
  - Estimated cost
  - Expected impact
  - Priority level
- Urgency assessment
- Executive summary

---

## 🛰️ Datasets & Data Sources

### NASA Earth Observation Data

#### 1. **MODIS (Moderate Resolution Imaging Spectroradiometer)**
- **Product:** MODIS_Terra_Land_Surface_Temp_Day
- **Resolution:** 1km
- **Use Case:** Urban heat island detection
- **Update Frequency:** Daily
- **Access:** NASA GIBS API

#### 2. **Landsat 8/9**
- **Product:** Landsat NDVI (Normalized Difference Vegetation Index)
- **Resolution:** 30m
- **Use Case:** Vegetation health and green space analysis
- **Update Frequency:** 16 days
- **Access:** NASA EARTHDATA

#### 3. **Sentinel-5P**
- **Product:** TROPOMI Air Quality (NO₂, SO₂, CO)
- **Resolution:** 5.5km
- **Use Case:** Air pollution monitoring
- **Update Frequency:** Daily
- **Access:** Copernicus Open Access Hub

#### 4. **VIIRS (Visible Infrared Imaging Radiometer Suite)**
- **Product:** VIIRS_SNPP_DayNightBand_ENCC
- **Resolution:** 750m
- **Use Case:** Urban development and nighttime lights
- **Update Frequency:** Daily
- **Access:** NASA GIBS

### Auxiliary Datasets

#### 5. **GHS-POP (Global Human Settlement Population)**
- **Provider:** European Commission JRC
- **Resolution:** 100m
- **Use Case:** Population density analysis
- **Year:** 2020/2025 projections

#### 6. **ESA WorldCover**
- **Provider:** European Space Agency
- **Resolution:** 10m
- **Use Case:** Land cover classification (trees, buildings, water)
- **Year:** 2021

#### 7. **OpenStreetMap (OSM)**
- **Provider:** Community-driven
- **Use Case:** 
  - Road networks
  - Park boundaries
  - Healthcare facility locations
  - Building footprints

#### 8. **healthsites.io**
- **Provider:** HealthSites.io Project
- **Use Case:** Global healthcare facility database
- **Update:** Community-maintained

---

## 📈 Visualization Methods

### 1. **Interactive Satellite Maps**
**Component:** `SatelliteMap.jsx`

**Technology Stack:**
- **Leaflet.js** - Interactive mapping library
- **NASA GIBS** - Satellite imagery tiles
- **OpenStreetMap** - Base layer

**Features:**
- Real-time satellite imagery overlay
- Multiple data layers (heat, NDVI, aerosol, nightlights)
- Pan, zoom, and rotate controls
- Date selection for temporal analysis
- City-specific views

**Data Flow:**
```
User selects city + dataset + date
    ↓
Frontend requests NASA GIBS tiles
    ↓
GIBS API returns satellite imagery
    ↓
Leaflet renders map with overlay
    ↓
User interacts with map
```

**GIBS Tile URL Format:**
```
https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/
{LAYER_NAME}/default/{DATE}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png
```

---

### 2. **3D Urban Visualization**
**Component:** `UrbanCity3D.jsx`

**Technology Stack:**
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helper components

**Visualization Elements:**

**A. Buildings**
- Height: Represents building density
- Color: Heat level indicator
  - Red hues → High heat risk
  - Orange → Moderate heat
  - Blue-green → Low heat
- Material: Metallic/reflective for realism

**B. Green Spaces**
- Parks with tree clusters
- Size proportional to green coverage percentage
- Dynamic tree placement
- Green color gradient

**C. Lighting & Environment**
- Directional sunlight with shadows
- Ambient lighting for depth
- Point lights for street illumination
- Fog effect for atmospheric depth

**Features:**
- Auto-rotation mode
- Interactive camera controls (orbit, zoom, pan)
- Real-time rendering
- Shadow casting for realism
- Dynamic scene generation based on AI analysis

**Data Mapping:**
```javascript
heatLevel (from AI) → Building colors
greenCoverage (%) → Number of parks
riskIndex → Color intensity
```

---

### 3. **Data Metrics Dashboard**
**Component:** `NASAData.jsx`

**Metric Cards Display:**

**A. Current Value Card**
- Temperature (°C) for heat analysis
- Mean NDVI for vegetation
- Real-time measurements

**B. Coverage/Risk Card**
- Risk Index (0-10)
- Green space coverage (%)
- Color-coded status indicators

**C. Affected Population Card**
- Number of vulnerable people
- Displayed in thousands
- Trend indicators

**D. Status Card**
- Risk Level (Critical/High/Moderate/Low)
- Color-coded: 🚨 🔴 ⚠️ ✅
- Status emoji indicators

---

### 4. **AI Recommendations Panel**
**Component:** `NASAData.jsx`

**Display Format:**
- Numbered list (1, 2, 3...)
- Priority-based ordering
- Icon-enhanced text
- Actionable insights

**Recommendation Types:**
- 🚨 Emergency actions
- 🌳 Green infrastructure
- 🏥 Healthcare facilities
- 🏗️ Urban planning
- 💧 Cooling solutions

---

### 5. **Future Predictions Visualization**
**Component:** `NASAData.jsx`

**Elements:**

**A. Prediction Summary**
- 5-year outlook
- Urgency badge
- Executive summary text

**B. Future Recommendations Cards**
- Priority badge (Critical/High/Strategic)
- Action title
- Detailed description
- Metadata:
  - ⏱️ Timeframe
  - 💰 Estimated cost
  - 📊 Expected impact

**Visual Hierarchy:**
```
Urgency Badge (top)
    ↓
Summary Text
    ↓
Recommendation Cards (grid)
    ↓
Metadata (icons + text)
```

---

### 6. **VR Experience (New)**
**Component:** `UrbanVR.jsx`

**Features:**
- 360° video player
- Fullscreen mode
- Video gallery with thumbnails
- Category-based organization
- Urban health themed content

**Video Categories:**
- Heat Island Visualization
- Green Space Distribution
- Air Quality Monitoring
- Urban Development
- Healthcare Accessibility
- Sustainable City Vision
- Health Indicators

---

## 🔄 Data Flow Architecture

### Complete Pipeline

```
1. USER INTERACTION
   ↓
   Selects: City + Dataset + Date
   ↓
2. FRONTEND (React)
   ↓
   Calls: aiModels.js API functions
   ↓
3. BACKEND (Flask)
   ↓
   Receives: POST request with coordinates
   ↓
4. AI MODEL PROCESSING
   ↓
   A. Heat Risk Model
      - Fetches city data
      - Calculates HRI formula
      - Generates recommendations
   ↓
   B. Green Space Model
      - Analyzes NDVI data
      - Calculates accessibility
      - Assesses visibility
   ↓
   C. Healthcare Model
      - Maps facilities
      - Calculates drive-times
      - Identifies gaps
   ↓
   D. Prediction Model
      - Projects trends
      - Models interventions
      - Prioritizes actions
   ↓
5. DATA AGGREGATION
   ↓
   JSON response with:
   - Metrics
   - Recommendations
   - Predictions
   ↓
6. VISUALIZATION
   ↓
   A. Satellite Map (Leaflet)
      - NASA GIBS imagery
      - Interactive overlay
   ↓
   B. 3D City (Three.js)
      - Dynamic scene
      - Color-coded buildings
      - Green spaces
   ↓
   C. Metrics Dashboard
      - Cards with values
      - Status indicators
      - Trend arrows
   ↓
   D. Recommendations
      - Prioritized list
      - Actionable items
   ↓
7. USER INSIGHTS
   ↓
   Decision-making for urban planning
```

---

## 🎯 Key Integration Points

### 1. **NASA GIBS Integration**
```javascript
// SatelliteMap.jsx
const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/
${gibsLayer}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`;

L.tileLayer(gibsUrl, {
  attribution: 'NASA GIBS',
  opacity: 0.7,
  maxZoom: 9
}).addTo(map);
```

### 2. **AI Model API Calls**
```javascript
// aiModels.js
export const analyzeHeatRisk = async (city, coordinates, date) => {
  const response = await axios.post(`${API_BASE}/heat-risk`, {
    city,
    coordinates,
    date
  });
  return response.data;
};
```

### 3. **3D Visualization Data Binding**
```javascript
// UrbanCity3D.jsx
<UrbanCity3D 
  heatLevel={aiResults.riskLevel?.toLowerCase()}
  greenCoverage={aiResults.greenspaceCoverage}
  autoRotate={true}
/>
```

---

## 📊 Data Accuracy & Validation

### Satellite Data
- **MODIS LST:** ±1°C accuracy
- **Landsat NDVI:** ±0.05 NDVI units
- **Sentinel-5P:** ±15% for NO₂

### AI Model Validation
- **Heat Risk:** Validated against historical heat events
- **Green Space:** Cross-referenced with municipal data
- **Healthcare:** Verified with WHO facility databases

### Update Frequency
- **Real-time:** NASA GIBS imagery (daily)
- **Periodic:** AI model recalibration (monthly)
- **On-demand:** User-triggered analysis

---

## 🚀 Performance Optimization

### Frontend
- Lazy loading for 3D components
- Memoization for expensive calculations
- Debounced API calls
- Cached satellite tiles

### Backend
- Pre-computed city databases
- Efficient numpy operations
- Async request handling
- Response compression

---

## 📚 References

### Research Papers
1. Urban Heat Island Effect - EPA Research
2. Green Space Health Benefits - WHO Guidelines
3. Healthcare Accessibility Standards - UN-Habitat

### Data Sources
- NASA EARTHDATA: https://earthdata.nasa.gov/
- ESA Copernicus: https://www.copernicus.eu/
- OpenStreetMap: https://www.openstreetmap.org/
- GHS-POP: https://ghsl.jrc.ec.europa.eu/

### AI Models
- EsriDE Heat Risk: https://github.com/EsriDE/urban-heat-risk-index
- GreenEx_Py: https://github.com/Spatial-Data-Science-and-GEO-AI-Lab/GreenEx_Py
- Healthcare Analysis: https://github.com/radoslawkrolikowski/health-care-analysis

---

## 🎓 Technical Summary

**UrbanScope** combines:
- ✅ **3 AI models** for comprehensive urban health analysis
- ✅ **4 NASA datasets** for real-time satellite observations
- ✅ **6 visualization methods** for intuitive data presentation
- ✅ **5-year predictions** for proactive urban planning
- ✅ **Evidence-based recommendations** for policy makers

**Result:** A complete urban health intelligence platform that transforms complex satellite data and AI analysis into actionable insights for creating healthier, more sustainable cities.

---

*Last Updated: October 5, 2025*
*Project: NASA Space Apps Challenge 2025 - Data Pathways to Healthy Cities*
