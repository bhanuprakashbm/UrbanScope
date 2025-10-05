import React, { useState } from 'react';
import SatelliteMap from '../../components/SatelliteMap/SatelliteMap';
import UrbanCity3D from '../../components/3D_Models/UrbanCity3D';
import { analyzeGreenSpace, getCityCoordinates } from '../../utils/aiModels';
import './GreenSpace.css';

function GreenSpace() {
  const [selectedCity, setSelectedCity] = useState('');
  const [bufferDistance, setBufferDistance] = useState(500);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [greenResults, setGreenResults] = useState(null);

  const cities = [
    { name: 'New York', country: 'USA' },
    { name: 'London', country: 'UK' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Delhi', country: 'India' },
    { name: 'São Paulo', country: 'Brazil' },
    { name: 'Mumbai', country: 'India' }
  ];

  const handleAnalyze = async () => {
    if (!selectedCity) {
      alert('Please select a city');
      return;
    }
    
    setLoading(true);
    
    try {
      const coordinates = getCityCoordinates(selectedCity);
      const response = await analyzeGreenSpace(selectedCity, coordinates, bufferDistance);
      setGreenResults(response.data);
      setShowMap(true);
    } catch (error) {
      console.error('Green space analysis failed:', error);
      alert('Analysis failed. Make sure backend is running on http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="green-space-page">
      {/* Header */}
      <section className="green-header">
        <div className="green-header-content">
          <h1 className="green-title">🌳 Green Space Exposure Analysis</h1>
          <p className="green-subtitle">
            Comprehensive assessment of urban green spaces using GreenEx_Py methodology
          </p>
          <div className="green-info-badges">
            <span className="info-badge">🌿 Availability</span>
            <span className="info-badge">🚶 Accessibility</span>
            <span className="info-badge">👁️ Visibility</span>
          </div>
        </div>
      </section>

      {/* Model Information */}
      <section className="model-info-section">
        <div className="container">
          <div className="model-info-card">
            <h2>🔬 GreenEx_Py - Three-Perspective Analysis</h2>
            <div className="perspectives-grid">
              <div className="perspective-card">
                <h3>🌿 Availability</h3>
                <ul>
                  <li>NDVI (Normalized Difference Vegetation Index)</li>
                  <li>Total green space coverage (%)</li>
                  <li>Number of parks and green areas</li>
                  <li>Tree canopy coverage</li>
                </ul>
              </div>
              <div className="perspective-card">
                <h3>🚶 Accessibility</h3>
                <ul>
                  <li>Distance to nearest park/green space</li>
                  <li>WHO recommendation: &lt;300m (5-min walk)</li>
                  <li>Population within buffer zones</li>
                  <li>Accessibility score (0-100)</li>
                </ul>
              </div>
              <div className="perspective-card">
                <h3>👁️ Visibility</h3>
                <ul>
                  <li>Green Visibility Index (GVI)</li>
                  <li>Street-level greenery perception</li>
                  <li>Visual exposure to vegetation</li>
                  <li>Psychological health benefits</li>
                </ul>
              </div>
            </div>
            <div className="data-sources">
              <h4>📡 Data Sources</h4>
              <p><strong>Sentinel-2:</strong> NDVI vegetation analysis (10m resolution)</p>
              <p><strong>ESA WorldCover:</strong> Land cover classification</p>
              <p><strong>OpenStreetMap:</strong> Park locations and boundaries</p>
              <p><strong>Planetary Computer:</strong> Cloud-based geospatial processing</p>
            </div>
            <div className="model-source">
              <p>
                <strong>Based on:</strong> <a href="https://github.com/Spatial-Data-Science-and-GEO-AI-Lab/GreenEx_Py" target="_blank" rel="noopener noreferrer">
                  Spatial-Data-Science-and-GEO-AI-Lab/GreenEx_Py
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Controls */}
      <section className="analysis-section">
        <div className="container">
          <h2 className="section-title">🎯 Analyze Green Space Exposure</h2>
          
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
              <label>Buffer Distance (meters)</label>
              <select
                value={bufferDistance}
                onChange={(e) => setBufferDistance(Number(e.target.value))}
                className="control-select"
              >
                <option value={300}>300m (5-min walk)</option>
                <option value={500}>500m (7-min walk)</option>
                <option value={800}>800m (10-min walk)</option>
                <option value={1000}>1000m (12-min walk)</option>
              </select>
            </div>

            <button 
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? '🔄 Analyzing...' : '🔍 Analyze Green Space'}
            </button>
          </div>

          {/* Results Display */}
          {greenResults && (
            <>
              {/* Overview Cards */}
              <div className="green-overview">
                <div className="green-card" style={{ borderColor: greenResults.statusColor }}>
                  <div className="green-icon">📊</div>
                  <h3>NDVI</h3>
                  <div className="green-value">{greenResults.meanNDVI.toFixed(2)}</div>
                  <p className="green-label">{greenResults.ndviCategory}</p>
                </div>

                <div className="green-card" style={{ borderColor: greenResults.statusColor }}>
                  <div className="green-icon">🌳</div>
                  <h3>Coverage</h3>
                  <div className="green-value">{greenResults.greenspaceCoverage}%</div>
                  <p className="green-label" style={{ color: greenResults.statusColor }}>
                    {greenResults.status}
                  </p>
                </div>

                <div className="green-card" style={{ borderColor: greenResults.accessibilityColor }}>
                  <div className="green-icon">🚶</div>
                  <h3>Accessibility</h3>
                  <div className="green-value">{greenResults.accessibilityScore}/100</div>
                  <p className="green-label" style={{ color: greenResults.accessibilityColor }}>
                    {greenResults.accessibility}
                  </p>
                </div>

                <div className="green-card" style={{ borderColor: greenResults.statusColor }}>
                  <div className="green-icon">👁️</div>
                  <h3>Visibility</h3>
                  <div className="green-value">{greenResults.visibilityScore}</div>
                  <p className="green-label">Visibility Index</p>
                </div>
              </div>

              {/* 3D Visualization */}
              <div className="visualization-section">
                <h3>🏙️ 3D Urban Green Space Visualization</h3>
                <UrbanCity3D 
                  heatLevel="moderate"
                  greenCoverage={greenResults.greenspaceCoverage || 20}
                  autoRotate={true}
                />
                <p className="viz-description">
                  Interactive 3D model showing green space distribution. Green areas represent parks and vegetation.
                </p>
              </div>

              {/* Satellite Map */}
              {showMap && (
                <div className="map-section">
                  <h3>🛰️ NASA Satellite Imagery - NDVI Vegetation Index</h3>
                  <SatelliteMap 
                    city={selectedCity}
                    dataset="greenspace"
                    date={new Date().toISOString().slice(0, 10)}
                  />
                  <p className="map-description">
                    Landsat NDVI overlay showing vegetation density from NASA GIBS
                  </p>
                </div>
              )}

              {/* Detailed Metrics */}
              <div className="detailed-metrics">
                <h3>📈 Detailed Analysis</h3>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <span className="metric-label">Total Green Area</span>
                    <span className="metric-value">{greenResults.totalGreenAreaKm2} km²</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Number of Parks</span>
                    <span className="metric-value">{greenResults.parksCount}</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Average Park Size</span>
                    <span className="metric-value">{greenResults.avgParkSize} km²</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Street Trees</span>
                    <span className="metric-value">{greenResults.streetTrees.toLocaleString()}</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Canopy Coverage</span>
                    <span className="metric-value">{greenResults.canopyCoverage}%</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Distance to Park</span>
                    <span className="metric-value">{greenResults.distanceToNearestPark}m</span>
                  </div>
                </div>
              </div>

              {/* Per Capita Analysis */}
              <div className="per-capita-section">
                <h3>👥 Per Capita Green Space</h3>
                <div className="per-capita-card">
                  <div className="per-capita-stat">
                    <span className="stat-label">Current Per Capita</span>
                    <span className="stat-value">{greenResults.greenSpacePerCapita} m²/person</span>
                  </div>
                  <div className="per-capita-stat">
                    <span className="stat-label">WHO Recommendation</span>
                    <span className="stat-value">{greenResults.whoRecommendation} m²/person</span>
                  </div>
                  <div className="per-capita-stat highlight">
                    <span className="stat-label">Status</span>
                    <span className="stat-value" style={{ 
                      color: greenResults.perCapitaStatus === 'Adequate' ? '#22c55e' : '#ef4444' 
                    }}>
                      {greenResults.perCapitaStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gap Analysis */}
              <div className="gap-analysis-section">
                <h3>📊 Gap Analysis</h3>
                <div className="gap-card">
                  <div className="gap-visual">
                    <div className="gap-bar">
                      <div 
                        className="gap-fill" 
                        style={{ width: `${(greenResults.greenspaceCoverage / greenResults.targetCoverage) * 100}%` }}
                      >
                        <span>{greenResults.greenspaceCoverage}%</span>
                      </div>
                    </div>
                    <div className="gap-labels">
                      <span>Current</span>
                      <span>Target: {greenResults.targetCoverage}%</span>
                    </div>
                  </div>
                  <div className="gap-stats">
                    <p><strong>Gap to Close:</strong> {greenResults.gap}%</p>
                    <p><strong>Priority:</strong> <span style={{ color: greenResults.statusColor }}>{greenResults.priority}</span></p>
                  </div>
                </div>
              </div>

              {/* Population Impact */}
              <div className="population-impact-section">
                <h3>👨‍👩‍👧‍👦 Population Impact</h3>
                <div className="impact-grid">
                  <div className="impact-card">
                    <div className="impact-icon">✅</div>
                    <h4>With Access</h4>
                    <p className="impact-count">{(greenResults.populationWithAccess / 1000).toFixed(0)}K</p>
                    <p className="impact-desc">Within {bufferDistance}m of green space</p>
                  </div>
                  <div className="impact-card">
                    <div className="impact-icon">⚠️</div>
                    <h4>Without Access</h4>
                    <p className="impact-count">{(greenResults.affectedPopulation / 1000).toFixed(0)}K</p>
                    <p className="impact-desc">Beyond {bufferDistance}m from green space</p>
                  </div>
                </div>
              </div>

              {/* Three Perspectives Summary */}
              <div className="perspectives-summary">
                <h3>🎯 Three-Perspective Summary</h3>
                <div className="summary-grid">
                  <div className="summary-card">
                    <h4>🌿 Availability: {greenResults.metrics.availability}%</h4>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${greenResults.metrics.availability}%` }}></div>
                    </div>
                  </div>
                  <div className="summary-card">
                    <h4>🚶 Accessibility: {greenResults.metrics.accessibility}/100</h4>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${greenResults.metrics.accessibility}%` }}></div>
                    </div>
                  </div>
                  <div className="summary-card">
                    <h4>👁️ Visibility: {greenResults.metrics.visibility}</h4>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${greenResults.metrics.visibility}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="recommendations-section">
                <h3>💡 AI-Powered Recommendations</h3>
                <div className="recommendations-list">
                  {greenResults.recommendations.map((rec, index) => (
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
                <p className="data-source-text">{greenResults.dataSource}</p>
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
              <h4>1️⃣ NDVI Analysis</h4>
              <p>Sentinel-2 satellite data provides vegetation density through NDVI calculations</p>
            </div>
            <div className="method-card">
              <h4>2️⃣ Spatial Analysis</h4>
              <p>OpenStreetMap data identifies park locations and calculates accessibility buffers</p>
            </div>
            <div className="method-card">
              <h4>3️⃣ Visibility Assessment</h4>
              <p>Street-level analysis determines visual exposure to green spaces</p>
            </div>
            <div className="method-card">
              <h4>4️⃣ Integration</h4>
              <p>Three perspectives combined for comprehensive green space assessment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GreenSpace;
