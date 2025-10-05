import React, { useState, useEffect } from 'react';
import SatelliteMap from '../../components/SatelliteMap/SatelliteMap';
import UrbanCity3D from '../../components/3D_Models/UrbanCity3D';
import { analyzeHeatRisk, getCityCoordinates } from '../../utils/aiModels';
import './HeatRisk.css';

function HeatRisk() {
  const [selectedCity, setSelectedCity] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [heatResults, setHeatResults] = useState(null);

  const cities = [
    { name: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060 },
    { name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
    { name: 'Delhi', country: 'India', lat: 28.7041, lon: 77.1025 },
    { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lon: -46.6333 },
    { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 }
  ];

  const handleAnalyze = async () => {
    if (!selectedCity) {
      alert('Please select a city');
      return;
    }
    
    setLoading(true);
    
    try {
      const coordinates = getCityCoordinates(selectedCity);
      const response = await analyzeHeatRisk(selectedCity, coordinates, currentDate);
      setHeatResults(response.data);
      setShowMap(true);
    } catch (error) {
      console.error('Heat risk analysis failed:', error);
      alert('Analysis failed. Make sure backend is running on http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="heat-risk-page">
      {/* Header Section */}
      <section className="heat-header">
        <div className="heat-header-content">
          <h1 className="heat-title">🌡️ Urban Heat Risk Index</h1>
          <p className="heat-subtitle">
            AI-powered analysis of urban heat islands and their impact on public health
          </p>
          <div className="heat-info-badges">
            <span className="info-badge">📊 Land Surface Temperature</span>
            <span className="info-badge">👥 Population Vulnerability</span>
            <span className="info-badge">🌳 Tree Coverage Analysis</span>
          </div>
        </div>
      </section>

      {/* Model Information */}
      <section className="model-info-section">
        <div className="container">
          <div className="model-info-card">
            <h2>🔬 Heat Risk Index Algorithm</h2>
            <div className="algorithm-formula">
              <code>
                HRI = (0.5 × Temperature) + (0.3 × Population Density) - (0.2 × Tree Coverage)
              </code>
            </div>
            <div className="model-details">
              <div className="detail-item">
                <h4>📥 Input Parameters</h4>
                <ul>
                  <li><strong>Land Surface Temperature (LST)</strong> - From Landsat 8/9 thermal bands</li>
                  <li><strong>Population Density</strong> - From GHS-POP dataset</li>
                  <li><strong>Tree Canopy Coverage</strong> - From ESA WorldCover</li>
                </ul>
              </div>
              <div className="detail-item">
                <h4>📤 Outputs</h4>
                <ul>
                  <li>Heat Risk Index (0-10 scale)</li>
                  <li>Risk Level: Critical/High/Moderate/Low</li>
                  <li>Urban Heat Island (UHI) Effect (°C)</li>
                  <li>Affected Population (vulnerable groups)</li>
                  <li>Cooling Potential Analysis</li>
                </ul>
              </div>
            </div>
            <div className="model-source">
              <p>
                <strong>Based on:</strong> <a href="https://github.com/EsriDE/urban-heat-risk-index" target="_blank" rel="noopener noreferrer">
                  EsriDE/urban-heat-risk-index
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Controls */}
      <section className="analysis-section">
        <div className="container">
          <h2 className="section-title">🎯 Analyze Urban Heat Risk</h2>
          
          <div className="analysis-controls">
            <div className="control-group">
              <label>Select City</label>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="control-select"
              >
                <option value="">Choose a city...</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}, {city.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label>Date</label>
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                max={new Date().toISOString().slice(0, 10)}
                className="control-input"
              />
            </div>

            <button 
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? '🔄 Analyzing...' : '🔍 Analyze Heat Risk'}
            </button>
          </div>

          {/* Results Display */}
          {heatResults && (
            <>
              {/* Risk Overview Cards */}
              <div className="risk-overview">
                <div className="risk-card" style={{ borderColor: heatResults.riskColor }}>
                  <div className="risk-icon">🌡️</div>
                  <h3>Temperature</h3>
                  <div className="risk-value">{heatResults.temperature}°C</div>
                  <p className="risk-label">Land Surface Temp</p>
                </div>

                <div className="risk-card" style={{ borderColor: heatResults.riskColor }}>
                  <div className="risk-icon">🔥</div>
                  <h3>Heat Index</h3>
                  <div className="risk-value">{heatResults.heatIndex}°C</div>
                  <p className="risk-label">Feels Like (with UHI)</p>
                </div>

                <div className="risk-card" style={{ borderColor: heatResults.riskColor }}>
                  <div className="risk-icon">📊</div>
                  <h3>Risk Index</h3>
                  <div className="risk-value">{heatResults.riskIndex}/10</div>
                  <p className="risk-label" style={{ color: heatResults.riskColor }}>
                    {heatResults.riskLevel}
                  </p>
                </div>

                <div className="risk-card" style={{ borderColor: heatResults.riskColor }}>
                  <div className="risk-icon">👥</div>
                  <h3>Affected Population</h3>
                  <div className="risk-value">{(heatResults.affectedPopulation / 1000).toFixed(0)}K</div>
                  <p className="risk-label">Vulnerable Groups</p>
                </div>
              </div>

              {/* 3D Visualization */}
              <div className="visualization-section">
                <h3>🏙️ 3D Urban Heat Visualization</h3>
                <UrbanCity3D 
                  heatLevel={heatResults.riskLevel?.toLowerCase() || 'moderate'}
                  greenCoverage={heatResults.treeCoverage || 20}
                  autoRotate={true}
                />
                <p className="viz-description">
                  Interactive 3D model showing heat distribution. Building colors represent heat intensity.
                </p>
              </div>

              {/* Satellite Map */}
              {showMap && (
                <div className="map-section">
                  <h3>🛰️ NASA Satellite Imagery - Land Surface Temperature</h3>
                  <SatelliteMap 
                    city={selectedCity}
                    dataset="heat"
                    date={currentDate}
                  />
                  <p className="map-description">
                    MODIS Land Surface Temperature overlay from NASA GIBS
                  </p>
                </div>
              )}

              {/* Detailed Metrics */}
              <div className="detailed-metrics">
                <h3>📈 Detailed Analysis</h3>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <span className="metric-label">Urban Heat Island Effect</span>
                    <span className="metric-value">{heatResults.uhiEffect}°C</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Tree Coverage</span>
                    <span className="metric-value">{heatResults.treeCoverage}%</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Population Density</span>
                    <span className="metric-value">{heatResults.populationDensity} per km²</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Alert Level</span>
                    <span className="metric-value" style={{ color: heatResults.riskColor }}>
                      {heatResults.alertLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vulnerable Groups */}
              {heatResults.vulnerableGroups && (
                <div className="vulnerable-section">
                  <h3>👨‍👩‍👧‍👦 Vulnerable Populations</h3>
                  <div className="vulnerable-grid">
                    <div className="vulnerable-card">
                      <div className="vulnerable-icon">👴</div>
                      <h4>Elderly (65+)</h4>
                      <p className="vulnerable-count">{(heatResults.vulnerableGroups.elderly / 1000).toFixed(0)}K people</p>
                      <p className="vulnerable-desc">Higher heat sensitivity</p>
                    </div>
                    <div className="vulnerable-card">
                      <div className="vulnerable-icon">👶</div>
                      <h4>Children (0-5)</h4>
                      <p className="vulnerable-count">{(heatResults.vulnerableGroups.children / 1000).toFixed(0)}K people</p>
                      <p className="vulnerable-desc">Developing thermoregulation</p>
                    </div>
                    <div className="vulnerable-card">
                      <div className="vulnerable-icon">👷</div>
                      <h4>Outdoor Workers</h4>
                      <p className="vulnerable-count">{(heatResults.vulnerableGroups.outdoorWorkers / 1000).toFixed(0)}K people</p>
                      <p className="vulnerable-desc">Extended heat exposure</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cooling Potential */}
              {heatResults.potentialCooling && (
                <div className="cooling-section">
                  <h3>❄️ Cooling Potential Analysis</h3>
                  <div className="cooling-card">
                    <div className="cooling-stat">
                      <span className="cooling-label">Current Tree Cover</span>
                      <span className="cooling-value">{heatResults.potentialCooling.currentCover}%</span>
                    </div>
                    <div className="cooling-stat">
                      <span className="cooling-label">Target Tree Cover (WHO)</span>
                      <span className="cooling-value">{heatResults.potentialCooling.targetCover}%</span>
                    </div>
                    <div className="cooling-stat">
                      <span className="cooling-label">Gap to Close</span>
                      <span className="cooling-value">{heatResults.potentialCooling.gap}%</span>
                    </div>
                    <div className="cooling-stat highlight">
                      <span className="cooling-label">Potential Temperature Reduction</span>
                      <span className="cooling-value">-{heatResults.potentialCooling.potentialReduction}°C</span>
                    </div>
                    <div className="cooling-timeframe">
                      <p>⏱️ Timeframe: {heatResults.potentialCooling.timeframe}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="recommendations-section">
                <h3>💡 AI-Powered Recommendations</h3>
                <div className="recommendations-list">
                  {heatResults.recommendations.map((rec, index) => (
                    <div key={index} className="recommendation-item">
                      <span className="rec-number">{index + 1}</span>
                      <p>{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Sources */}
              <div className="data-source-section">
                <h3>📡 Data Sources</h3>
                <p className="data-source-text">{heatResults.dataSource}</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="methodology-section">
        <div className="container">
          <h2>🔬 Methodology</h2>
          <div className="methodology-grid">
            <div className="method-card">
              <h4>1️⃣ Data Collection</h4>
              <p>Satellite imagery from Landsat 8/9 provides land surface temperature data at 30m resolution</p>
            </div>
            <div className="method-card">
              <h4>2️⃣ Population Analysis</h4>
              <p>GHS-POP dataset overlays population density to identify vulnerable areas</p>
            </div>
            <div className="method-card">
              <h4>3️⃣ Vegetation Assessment</h4>
              <p>ESA WorldCover provides tree canopy coverage for cooling potential analysis</p>
            </div>
            <div className="method-card">
              <h4>4️⃣ Risk Calculation</h4>
              <p>Weighted algorithm combines temperature, population, and vegetation factors</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeatRisk;
