import React, { useState, useEffect } from 'react';
import SatelliteMap from '../../components/SatelliteMap/SatelliteMap';
import UrbanCity3D from '../../components/3D_Models/UrbanCity3D';
import { analyzeHeatRisk, analyzeGreenSpace, analyzeHealthcare, getCityCoordinates, predictFutureTrends } from '../../utils/aiModels';
import './NASAData.css';

function NASAData() {
  const [selectedDataset, setSelectedDataset] = useState('heat');
  const [selectedCity, setSelectedCity] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [showPredictions, setShowPredictions] = useState(false);

  const datasets = [
    {
      id: 'heat',
      name: 'Urban Heat Islands',
      icon: '🌡️',
      description: 'Extreme heat zones affecting public health',
      source: 'MODIS LST',
      resolution: '1km',
      color: '#ef4444',
      focusArea: 'Heat & Air Quality'
    },
    {
      id: 'greenspace',
      name: 'Green Space Access',
      icon: '🌳',
      description: 'Communities needing better access to parks',
      source: 'Landsat NDVI',
      resolution: '30m',
      color: '#22c55e',
      focusArea: 'Green Infrastructure'
    },
    {
      id: 'airquality',
      name: 'Air & Water Pollution',
      icon: '💨',
      description: 'Areas dealing with polluted air or water',
      source: 'Sentinel-5P',
      resolution: '5.5km',
      color: '#3b82f6',
      focusArea: 'Environmental Health'
    }
  ];

  const cities = [
    { name: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060 },
    { name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
    { name: 'Delhi', country: 'India', lat: 28.7041, lon: 77.1025 },
    { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lon: -46.6333 },
    { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 }
  ];

  const currentDataset = datasets.find(d => d.id === selectedDataset);

  const handleLoadData = async () => {
    if (!selectedCity) {
      alert('Please select a city');
      return;
    }
    
    setLoading(true);
    setAiLoading(true);
    
    try {
      const coordinates = getCityCoordinates(selectedCity);
      
      let result;
      if (selectedDataset === 'heat') {
        const response = await analyzeHeatRisk(selectedCity, coordinates, currentDate);
        result = response.data;
      } else if (selectedDataset === 'greenspace') {
        const response = await analyzeGreenSpace(selectedCity, coordinates, 500);
        result = response.data;
      } else if (selectedDataset === 'airquality') {
        const response = await analyzeHeatRisk(selectedCity, coordinates, currentDate);
        result = response.data;
      } else {
        const response = await analyzeHeatRisk(selectedCity, coordinates, currentDate);
        result = response.data;
      }
      
      setAiResults(result);
      setShowMap(true);
      await loadPredictions(selectedCity, coordinates);
    } catch (error) {
      console.error('AI Analysis failed:', error);
      alert('AI analysis failed. Make sure backend is running on http://localhost:5000');
    } finally {
      setLoading(false);
      setAiLoading(false);
    }
  };

  const loadPredictions = async (city, coordinates) => {
    try {
      const response = await predictFutureTrends(city, coordinates, 5);
      setPredictions(response.data);
      setShowPredictions(true);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  return (
    <div className="nasa-data-page">
      {/* Header Section */}
      <section className="nasa-header">
        <div className="nasa-header-content">
          <h1 className="nasa-title">NASA Earth Observation Data</h1>
          <p className="nasa-subtitle">
            Access real-time satellite data to analyze urban health indicators
          </p>
        </div>
      </section>

      {/* Dataset Selection */}
      <section className="dataset-section">
        <div className="container">
          <h2 className="section-title">Select Data Layer</h2>
          <div className="dataset-grid">
            {datasets.map((dataset) => (
              <div
                key={dataset.id}
                className={`dataset-card ${selectedDataset === dataset.id ? 'active' : ''}`}
                onClick={() => setSelectedDataset(dataset.id)}
                style={{ borderColor: selectedDataset === dataset.id ? dataset.color : '#e2e8f0' }}
              >
                <div className="dataset-icon" style={{ fontSize: '3rem' }}>
                  {dataset.icon}
                </div>
                <h3 className="dataset-name">{dataset.name}</h3>
                <p className="dataset-description">{dataset.description}</p>
                <div className="dataset-meta">
                  <span className="dataset-source">📡 {dataset.source}</span>
                  <span className="dataset-resolution">📏 {dataset.resolution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Viewer */}
      <section className="data-viewer-section">
        <div className="container">
          <div className="viewer-controls">
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
              className="load-data-btn"
              onClick={handleLoadData}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load Data'}
            </button>
          </div>

          {/* Current Dataset Info */}
          <div className="current-dataset-info">
            <div className="info-header">
              <span className="info-icon">{currentDataset.icon}</span>
              <h3>{currentDataset.name}</h3>
            </div>
            <p>{currentDataset.description}</p>
            <div className="info-badges">
              <span className="badge">Source: {currentDataset.source}</span>
              <span className="badge">Resolution: {currentDataset.resolution}</span>
              <span className="badge">Date: {currentDate}</span>
            </div>
          </div>

          {/* 3D City Visualization */}
          {aiResults && selectedCity && (
            <div className="city-3d-viewer" style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#fff' }}>🏙️ 3D Urban Visualization</h3>
              <UrbanCity3D 
                heatLevel={aiResults.riskLevel?.toLowerCase() || 'moderate'}
                greenCoverage={aiResults.greenspaceCoverage || aiResults.treeCoverage || 20}
                autoRotate={true}
              />
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                Interactive 3D model showing urban heat distribution and green space coverage
              </p>
            </div>
          )}

          {/* Satellite Image Viewer */}
          <div className="satellite-viewer">
            {loading ? (
              <div className="viewer-loading">
                <div className="loading-spinner"></div>
                <p>Loading NASA satellite data...</p>
              </div>
            ) : showMap && selectedCity ? (
              <SatelliteMap 
                city={selectedCity}
                dataset={selectedDataset}
                date={currentDate}
              />
            ) : selectedCity ? (
              <div className="viewer-content">
                <div className="viewer-placeholder">
                  <span className="placeholder-icon">🛰️</span>
                  <h3>{currentDataset.name}</h3>
                  <p>{selectedCity}</p>
                  <p className="placeholder-date">{currentDate}</p>
                  <div className="placeholder-note">
                    <p>Click "Load Data" to view NASA GIBS satellite imagery</p>
                    <p className="api-info">Using NASA Global Imagery Browse Services (GIBS)</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="viewer-empty">
                <span className="empty-icon">🗺️</span>
                <h3>Select a city to view satellite data</h3>
                <p>Choose a city and date to load NASA Earth observation data</p>
              </div>
            )}
          </div>

          {/* Data Metrics */}
          {selectedCity && aiResults && (
            <div className="data-metrics-grid">
              <div className="metric-card">
                <h4>Current Value</h4>
                <p className="metric-value">
                  {selectedDataset === 'modis' && aiResults.temperature}
                  {selectedDataset === 'ndvi' && aiResults.meanNDVI?.toFixed(2)}
                  {selectedDataset === 'aerosol' && aiResults.temperature}
                  {selectedDataset === 'nightlights' && '--'}
                </p>
                <span className="metric-unit">
                  {selectedDataset === 'modis' && '°C'}
                  {selectedDataset === 'ndvi' && 'NDVI'}
                  {selectedDataset === 'aerosol' && '°C'}
                  {selectedDataset === 'nightlights' && 'nW/cm²/sr'}
                </span>
              </div>
              <div className="metric-card">
                <h4>Coverage / Risk</h4>
                <p className="metric-value">
                  {selectedDataset === 'modis' && aiResults.riskIndex?.toFixed(1)}
                  {selectedDataset === 'ndvi' && aiResults.greenspaceCoverage?.toFixed(1)}
                  {selectedDataset === 'aerosol' && aiResults.riskIndex?.toFixed(1)}
                  {selectedDataset === 'nightlights' && '--'}
                </p>
                <span className="metric-unit">
                  {selectedDataset === 'modis' && 'Risk Index'}
                  {selectedDataset === 'ndvi' && '% Coverage'}
                  {selectedDataset === 'aerosol' && 'Risk Index'}
                  {selectedDataset === 'nightlights' && 'Index'}
                </span>
              </div>
              <div className="metric-card">
                <h4>Affected Population</h4>
                <p className="metric-value trend-neutral">
                  {aiResults.affectedPopulation ? (aiResults.affectedPopulation / 1000).toFixed(0) : '--'}
                </p>
                <span className="metric-unit">Thousand</span>
              </div>
              <div className="metric-card">
                <h4>Status</h4>
                <p className="metric-status" style={{ color: aiResults.riskColor || aiResults.statusColor }}>
                  {aiResults.riskLevel || aiResults.status || 'Analyzing...'}
                </p>
                <span className="metric-indicator">
                  {(aiResults.riskLevel === 'Critical' || aiResults.status === 'Critical') && '🚨'}
                  {(aiResults.riskLevel === 'High' || aiResults.status === 'Poor') && '🔴'}
                  {(aiResults.riskLevel === 'Moderate' || aiResults.status === 'Moderate') && '⚠️'}
                  {(aiResults.riskLevel === 'Low' || aiResults.status === 'Good') && '✅'}
                </span>
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          {aiResults && aiResults.recommendations && (
            <div className="ai-recommendations">
              <h3>🤖 AI-Powered Recommendations</h3>
              <div className="recommendations-list">
                {aiResults.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <span className="rec-number">{index + 1}</span>
                    <p>{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5-Year Predictions */}
          {predictions && (
            <div className="predictions-section">
              <h3>📈 5-Year Future Predictions</h3>
              <div className="prediction-summary">
                <p>{predictions.summary}</p>
                <div className="urgency-badge">{predictions.urgency}</div>
              </div>

              <div className="future-recommendations">
                {predictions.recommendations.map((rec, idx) => (
                  <div key={idx} className="future-rec-card">
                    <span className="priority-badge">{rec.priority}</span>
                    <h4>{rec.action}</h4>
                    <p>{rec.details}</p>
                    <div className="rec-meta">
                      <span>⏱️ {rec.timeframe}</span>
                      <span>💰 {rec.estimatedCost}</span>
                      <span>📊 {rec.expectedImpact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="data-sources-section">
        <div className="container">
          <h2 className="section-title">Data Sources & APIs</h2>
          <div className="sources-grid">
            <div className="source-card">
              <div className="source-icon">🛰️</div>
              <h3>NASA GIBS</h3>
              <p>Global Imagery Browse Services for near real-time satellite imagery</p>
              <a href="https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/gibs" target="_blank" rel="noopener noreferrer" className="source-link">
                Learn More →
              </a>
            </div>
            <div className="source-card">
              <div className="source-icon">🌍</div>
              <h3>NASA EARTHDATA</h3>
              <p>Comprehensive Earth science data from multiple NASA missions</p>
              <a href="https://earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer" className="source-link">
                Learn More →
              </a>
            </div>
            <div className="source-card">
              <div className="source-icon">📡</div>
              <h3>Copernicus Sentinel</h3>
              <p>European Space Agency's Earth observation program</p>
              <a href="https://sentinel.esa.int/" target="_blank" rel="noopener noreferrer" className="source-link">
                Learn More →
              </a>
            </div>
            <div className="source-card">
              <div className="source-icon">🗄️</div>
              <h3>Landsat Program</h3>
              <p>Longest-running Earth observation satellite program</p>
              <a href="https://landsat.gsfc.nasa.gov/" target="_blank" rel="noopener noreferrer" className="source-link">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NASAData;
