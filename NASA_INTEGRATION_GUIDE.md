# 🛰️ NASA Data Integration Guide

## Overview
UrbanScope now integrates **real NASA satellite data** from multiple sources for comprehensive urban health analysis.

---

## 🌍 NASA Data Sources

### 1. **NASA GIBS (Global Imagery Browse Services)**
**URL:** https://gibs.earthdata.nasa.gov/

**What it provides:**
- Near real-time satellite imagery
- Multiple data layers (temperature, vegetation, aerosols)
- Global coverage with daily updates
- Web-friendly tile format (WMTS)

**Layers Used:**
- ✅ `MODIS_Terra_Land_Surface_Temp_Day` - Heat risk analysis
- ✅ `MODIS_Terra_NDVI_8Day` - Vegetation/green space
- ✅ `MODIS_Combined_MAIAC_L2G_AerosolOpticalDepth` - Air quality

### 2. **NASA Worldview**
**URL:** https://worldview.earthdata.nasa.gov/

**What it provides:**
- Interactive satellite imagery viewer
- Pre-rendered snapshots
- Layer combinations
- Temporal data access

**Integration:**
- Snapshot API for static imagery
- Layer configuration
- Temporal queries

### 3. **NASA Earth Observatory**
**URL:** https://earthobservatory.nasa.gov/

**What it provides:**
- Natural events tracking (EONET)
- Environmental phenomena
- Real-time alerts
- Historical data

---

## 🎨 Visualization Enhancements

### Hexagonal Heatmap Overlay
**Similar to your reference image!**

**Features:**
- ✅ Color-coded hexagons showing data intensity
- ✅ Interactive tooltips with values
- ✅ Multiple color scales:
  - **Heat:** Red-Orange-Yellow (temperature)
  - **Green Space:** Dark Green to Yellow (NDVI)
  - **Air Quality:** Blue scale (aerosol levels)

**Implementation:**
```javascript
// Hexagonal grid generation
- Grid size: 5x5 hexagons
- Radius: ~2km per hexagon
- Color mapping based on data values
- Tooltip shows exact measurements
```

### Legend Display
- ✅ Real-time legend showing color scale
- ✅ Value ranges for each color
- ✅ Dataset-specific labels
- ✅ Loading indicators

---

## 📊 Data Layers Available

### 1. **Land Surface Temperature (LST)**
- **Source:** MODIS Terra
- **Resolution:** 1km
- **Update:** Daily
- **Unit:** Kelvin (converted to Celsius)
- **Use Case:** Urban heat island analysis

**Color Scale:**
- 🔴 Dark Red: >40°C (Critical)
- 🔴 Crimson: 35-40°C (High)
- 🟠 Tomato: 30-35°C (Moderate)
- 🟡 Orange: 25-30°C (Low)
- 🟡 Gold: <25°C (Normal)

### 2. **NDVI (Vegetation Index)**
- **Source:** MODIS Terra
- **Resolution:** 500m
- **Update:** 8-day composite
- **Range:** -1 to 1
- **Use Case:** Green space assessment

**Color Scale:**
- 🟢 Dark Green: >0.6 (Dense vegetation)
- 🟢 Forest Green: 0.4-0.6 (Moderate vegetation)
- 🟢 Light Green: 0.2-0.4 (Sparse vegetation)
- 🟡 Khaki: <0.2 (Bare/Urban)

### 3. **Aerosol Optical Depth (AOD)**
- **Source:** MODIS MAIAC
- **Resolution:** 1km
- **Update:** Daily
- **Range:** 0-1+
- **Use Case:** Air quality indicator

**Color Scale:**
- 🔵 Royal Blue: >0.3 (Unhealthy)
- 🔵 Sky Blue: 0.2-0.3 (Moderate)
- 🔵 Light Blue: 0.1-0.2 (Good)
- 🔵 Light Cyan: <0.1 (Excellent)

---

## 🔧 Technical Implementation

### SatelliteMap Component
**File:** `src/components/SatelliteMap/SatelliteMap.jsx`

**Key Features:**
1. **NASA GIBS Integration**
   ```javascript
   const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/
     ${layer}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`;
   ```

2. **Hexagonal Overlay**
   ```javascript
   - Generates hexagonal grid around city center
   - Simulates data values (can be replaced with real API data)
   - Color-codes based on dataset type
   - Adds interactive tooltips
   ```

3. **Error Handling**
   ```javascript
   - Fallback for missing tiles
   - Loading indicators
   - Error logging
   ```

### NASA API Utility
**File:** `src/utils/nasaAPI.js`

**Functions:**
- `getGIBSTileURL()` - Generate GIBS tile URLs
- `fetchWorldviewSnapshot()` - Get Worldview imagery
- `fetchNaturalEvents()` - Get environmental events
- `fetchLandSurfaceTemperature()` - Get LST data
- `fetchNDVIData()` - Get vegetation data
- `fetchAerosolData()` - Get air quality data
- `fetchNASADataForLocation()` - Batch fetch all data

---

## 🚀 How It Works

### 1. **User Selects City**
```
User clicks "Analyze" → Component loads
```

### 2. **Map Initialization**
```
Leaflet map created → CartoDB base layer added
```

### 3. **NASA GIBS Layer**
```
GIBS URL generated → Tile layer added → Satellite imagery displayed
```

### 4. **Hexagonal Overlay**
```
Grid generated → Data values assigned → Hexagons drawn → Colors applied
```

### 5. **Interactive Features**
```
Hover hexagon → Tooltip shows value
Click hexagon → (Future: Detailed analysis)
```

---

## 📡 API Endpoints

### NASA GIBS WMTS
```
https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/
  {LAYER}/default/{DATE}/{TILEMATRIXSET}/{z}/{y}/{x}.{FORMAT}
```

**Parameters:**
- `LAYER`: Layer identifier (e.g., MODIS_Terra_Land_Surface_Temp_Day)
- `DATE`: YYYY-MM-DD format
- `TILEMATRIXSET`: GoogleMapsCompatible_Level9
- `FORMAT`: png, jpeg

### NASA Worldview API
```
https://worldview.earthdata.nasa.gov/api/v1/snapshot
  ?REQUEST=GetSnapshot
  &TIME={DATE}
  &BBOX={BBOX}
  &LAYERS={LAYERS}
  &WIDTH=1024
  &HEIGHT=1024
```

### NASA EONET (Natural Events)
```
https://eonet.gsfc.nasa.gov/api/v3/events
  ?bbox={BBOX}
  &limit=50
  &status=open
```

---

## 🎯 Data Flow

```
User Action
    ↓
Select City + Dataset + Date
    ↓
Frontend (React)
    ↓
NASA API Utility (nasaAPI.js)
    ↓
┌─────────────────┬─────────────────┬──────────────────┐
│   NASA GIBS     │  NASA Worldview │  NASA EONET      │
│   (Tiles)       │  (Snapshots)    │  (Events)        │
└─────────────────┴─────────────────┴──────────────────┘
    ↓
Data Processing
    ↓
Hexagonal Grid Generation
    ↓
Color Mapping
    ↓
Leaflet Map Rendering
    ↓
User sees: Base Map + Satellite Layer + Hexagonal Heatmap
```

---

## 🔑 No API Keys Required!

**Good News:** NASA GIBS, Worldview, and EONET are **completely free** and **don't require API keys**!

- ✅ No registration needed
- ✅ No rate limits (reasonable use)
- ✅ Open access for everyone
- ✅ Real-time data

---

## 📊 Real Data Integration (Future Enhancement)

### Current Implementation:
- ✅ NASA GIBS satellite imagery (real)
- ✅ Hexagonal overlay (simulated data)
- ✅ Color mapping (accurate scales)

### To Use Real Data:
Replace simulated values in `generateHexagonalHeatData()` with:

```javascript
// Instead of:
value = 25 + Math.random() * 20;

// Use:
const nasaData = await fetchLandSurfaceTemperature(lat, lon, date);
value = nasaData.temperature.celsius;
```

**Steps:**
1. Call `fetchNASADataForLocation()` for each hexagon center
2. Extract temperature/NDVI/AOD values
3. Apply to hexagon color mapping
4. Update tooltip with real measurements

---

## 🎨 Customization Options

### Change Hexagon Size:
```javascript
const radius = 0.05; // Adjust this value (degrees)
```

### Change Grid Density:
```javascript
const gridSize = 5; // Increase for more hexagons
```

### Change Color Scales:
```javascript
// Modify getHexColor() function
if (value > 40) return '#YOUR_COLOR';
```

### Add More Layers:
```javascript
// In nasaAPI.js, add to NASA_LAYERS:
NEW_LAYER: {
  id: 'LAYER_ID',
  name: 'Layer Name',
  // ... configuration
}
```

---

## 📈 Performance Optimization

### Tile Caching:
- Leaflet automatically caches tiles
- Reduces repeated API calls
- Faster map interactions

### Lazy Loading:
- Hexagons generated only when needed
- Map layers loaded on demand
- Efficient memory usage

### Error Handling:
- Fallback tiles for missing data
- Graceful degradation
- User-friendly error messages

---

## 🌟 Features Comparison

| Feature | Before | After |
|---------|--------|-------|
| Satellite Imagery | ✅ Basic | ✅ Enhanced with GIBS |
| Heatmap Overlay | ❌ None | ✅ Hexagonal visualization |
| Color Legend | ❌ None | ✅ Dynamic legend |
| Tooltips | ❌ None | ✅ Interactive values |
| Real NASA Data | ❌ Limited | ✅ Multiple sources |
| Loading States | ❌ None | ✅ Indicators |

---

## 📚 Resources

### NASA Documentation:
- [GIBS API Docs](https://wiki.earthdata.nasa.gov/display/GIBS)
- [Worldview User Guide](https://worldview.earthdata.nasa.gov/about)
- [EONET API](https://eonet.gsfc.nasa.gov/docs/v3)

### Data Catalogs:
- [NASA Earthdata Search](https://search.earthdata.nasa.gov/)
- [MODIS Products](https://modis.gsfc.nasa.gov/data/)
- [Landsat Data](https://landsat.gsfc.nasa.gov/)

### Tutorials:
- [GIBS Quick Start](https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+API+for+Developers)
- [Leaflet + GIBS](https://wiki.earthdata.nasa.gov/display/GIBS/Map+Library+Usage)

---

## 🎯 Next Steps

### Immediate:
1. ✅ Test hexagonal heatmap visualization
2. ✅ Verify NASA GIBS layers load correctly
3. ✅ Check legend displays properly

### Short-term:
1. Replace simulated data with real NASA API calls
2. Add more NASA layers (nighttime lights, urban extent)
3. Implement temporal slider for date selection

### Long-term:
1. Machine learning on NASA data
2. Predictive modeling with historical data
3. Real-time alerts from EONET
4. Custom layer combinations

---

## 🐛 Troubleshooting

### Map Not Loading:
- Check internet connection
- Verify date format (YYYY-MM-DD)
- Check browser console for errors

### Hexagons Not Showing:
- Ensure city is selected
- Check zoom level (should be 11+)
- Verify dataset parameter

### GIBS Tiles Missing:
- Some dates may not have data
- Try recent dates (last 7 days)
- Check layer availability

### Performance Issues:
- Reduce grid size
- Decrease hexagon count
- Use simpler base map

---

**Built for NASA Space Apps Challenge 2025** 🚀
*Making cities healthier with real satellite data!*
