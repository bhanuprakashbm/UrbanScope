import React, { useState } from 'react';
import SatelliteMap from '../../components/SatelliteMap/SatelliteMap';
import { analyzeHealthcare, getCityCoordinates } from '../../utils/aiModels';
import './Healthcare.css';

function Healthcare() {
  const [selectedCity, setSelectedCity] = useState('');
  const [population, setPopulation] = useState(1000000);
  const [driveTime, setDriveTime] = useState(15);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [healthcareResults, setHealthcareResults] = useState(null);

  const cities = [
    { name: 'New York', country: 'USA', pop: 1200000 },
    { name: 'London', country: 'UK', pop: 900000 },
    { name: 'Tokyo', country: 'Japan', pop: 2000000 },
    { name: 'Delhi', country: 'India', pop: 1500000 },
    { name: 'São Paulo', country: 'Brazil', pop: 1300000 },
    { name: 'Mumbai', country: 'India', pop: 1800000 }
  ];

  const handleCityChange = (cityName) => {
    setSelectedCity(cityName);
    const city = cities.find(c => c.name === cityName);
    if (city) {
      setPopulation(city.pop);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedCity) {
      alert('Please select a city');
      return;
    }
    
    setLoading(true);
    
    try {
      const coordinates = getCityCoordinates(selectedCity);
      const response = await analyzeHealthcare(selectedCity, coordinates, population, driveTime);
      setHealthcareResults(response.data);
      setShowMap(true);
    } catch (error) {
      console.error('Healthcare analysis failed:', error);
      alert('Analysis failed. Make sure backend is running on http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="healthcare-page">
      {/* Header */}
      <section className="healthcare-header">
        <div className="healthcare-header-content">
          <h1 className="healthcare-title">🏥 Healthcare Facility Access Analysis</h1>
          <p className="healthcare-subtitle">
            Comprehensive assessment of healthcare accessibility using drive-time isoline analysis
          </p>
          <div className="healthcare-info-badges">
            <span className="info-badge">🗺️ Facility Mapping</span>
            <span className="info-badge">⏱️ Drive-Time Analysis</span>
            <span className="info-badge">👥 Population Coverage</span>
          </div>
        </div>
      </section>

      {/* Model Information */}
      <section className="model-info-section">
        <div className="container">
          <div className="model-info-card">
            <h2>🔬 Healthcare Access Methodology</h2>
            <div className="methodology-grid-info">
              <div className="method-info-card">
                <h3>🗺️ A. Facility Mapping</h3>
                <ul>
                  <li>Primary care centers</li>
                  <li>Hospitals</li>
                  <li>Emergency centers</li>
                  <li>Specialist facilities</li>
                </ul>
              </div>
              <div className="method-info-card">
                <h3>⏱️ B. Drive-Time Isoline Analysis</h3>
                <ul>
                  <li>5-minute access zones</li>
                  <li>10-minute access zones</li>
                  <li>15-minute access zones (WHO standard)</li>
                  <li>Road network analysis</li>
                </ul>
              </div>
              <div className="method-info-card">
                <h3>👥 C. Population Overlay</h3>
                <ul>
                  <li>Population within service areas</li>
                  <li>Underserved population identification</li>
                  <li>Coverage percentage calculation</li>
                  <li>Demographic analysis</li>
                </ul>
              </div>
              <div className="method-info-card">
                <h3>📊 D. Resource Assessment</h3>
                <ul>
                  <li>Beds per 1,000 population</li>
                  <li>Doctors per 1,000 population</li>
                  <li>Facilities per 100,000 population</li>
                  <li>Quality score calculation</li>
                </ul>
              </div>
            </div>
            <div className="data-sources">
              <h4>📡 Data Sources</h4>
              <p><strong>healthsites.io:</strong> Healthcare facility locations</p>
              <p><strong>GHS-POP:</strong> Population distribution</p>
              <p><strong>OpenStreetMap:</strong> Road networks</p>
              <p><strong>GADM:</strong> Administrative boundaries</p>
              <p><strong>Openrouteservice API:</strong> Drive-time calculations</p>
            </div>
            <div className="model-source">
              <p>
                <strong>Based on:</strong> <a href="https://github.com/radoslawkrolikowski/health-care-analysis" target="_blank" rel="noopener noreferrer">
                  radoslawkrolikowski/health-care-analysis
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Controls */}
      <section className="analysis-section">
        <div className="container">
          <h2 className="section-title">🎯 Analyze Healthcare Access</h2>
          
          <div className="analysis-controls">
            <div className="control-group">
              <label>Select City</label>
              <select 
                value={selectedCity} 
                onChange={(e) => handleCityChange(e.target.value)}
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
              <label>Population</label>
              <input
                type="number"
                value={population}
                onChange={(e) => setPopulation(Number(e.target.value))}
                className="control-input"
                min="100000"
                step="100000"
              />
            </div>

            <div className="control-group">
              <label>Drive Time Threshold (minutes)</label>
              <select
                value={driveTime}
                onChange={(e) => setDriveTime(Number(e.target.value))}
                className="control-select"
              >
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes (WHO)</option>
                <option value={20}>20 minutes</option>
              </select>
            </div>

            <button 
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? '🔄 Analyzing...' : '🔍 Analyze Healthcare Access'}
            </button>
          </div>

          {/* Results Display */}
          {healthcareResults && (
            <>
              {/* Overview Cards */}
              <div className="healthcare-overview">
                <div className="healthcare-card" style={{ borderColor: healthcareResults.statusColor }}>
                  <div className="healthcare-icon">🏥</div>
                  <h3>Facilities</h3>
                  <div className="healthcare-value">{healthcareResults.facilitiesCount}</div>
                  <p className="healthcare-label">Total Healthcare Centers</p>
                </div>

                <div className="healthcare-card" style={{ borderColor: healthcareResults.statusColor }}>
                  <div className="healthcare-icon">✅</div>
                  <h3>Access Rate</h3>
                  <div className="healthcare-value">{healthcareResults.accessPercentage15min}%</div>
                  <p className="healthcare-label" style={{ color: healthcareResults.statusColor }}>
                    {healthcareResults.status}
                  </p>
                </div>

                <div className="healthcare-card" style={{ borderColor: healthcareResults.statusColor }}>
                  <div className="healthcare-icon">👥</div>
                  <h3>Population Served</h3>
                  <div className="healthcare-value">{(healthcareResults.populationWithAccess15min / 1000).toFixed(0)}K</div>
                  <p className="healthcare-label">Within {driveTime} minutes</p>
                </div>

                <div className="healthcare-card" style={{ borderColor: healthcareResults.statusColor }}>
                  <div className="healthcare-icon">📊</div>
                  <h3>Quality Score</h3>
                  <div className="healthcare-value">{healthcareResults.qualityScore}/100</div>
                  <p className="healthcare-label">Overall Quality</p>
                </div>
              </div>

              {/* Satellite Map */}
              {showMap && (
                <div className="map-section">
                  <h3>🗺️ Healthcare Facility Distribution Map</h3>
                  <SatelliteMap 
                    city={selectedCity}
                    dataset="heat"
                    date={new Date().toISOString().slice(0, 10)}
                  />
                  <p className="map-description">
                    Satellite view showing urban areas. Healthcare facilities would be overlaid in production.
                  </p>
                </div>
              )}

              {/* Drive-Time Access Analysis */}
              <div className="drive-time-section">
                <h3>⏱️ Drive-Time Access Analysis</h3>
                <div className="drive-time-grid">
                  <div className="drive-time-card">
                    <div className="time-badge">5 min</div>
                    <div className="access-percentage">{healthcareResults.accessPercentage5min}%</div>
                    <p className="access-count">{(healthcareResults.populationWithAccess5min / 1000).toFixed(0)}K people</p>
                    <p className="access-label">Immediate Access</p>
                  </div>
                  <div className="drive-time-card">
                    <div className="time-badge">10 min</div>
                    <div className="access-percentage">{healthcareResults.accessPercentage10min}%</div>
                    <p className="access-count">{(healthcareResults.populationWithAccess10min / 1000).toFixed(0)}K people</p>
                    <p className="access-label">Quick Access</p>
                  </div>
                  <div className="drive-time-card highlight">
                    <div className="time-badge">15 min</div>
                    <div className="access-percentage">{healthcareResults.accessPercentage15min}%</div>
                    <p className="access-count">{(healthcareResults.populationWithAccess15min / 1000).toFixed(0)}K people</p>
                    <p className="access-label">WHO Standard</p>
                  </div>
                </div>
              </div>

              {/* Facility Types */}
              <div className="facility-types-section">
                <h3>🏥 Facility Breakdown</h3>
                <div className="facility-grid">
                  <div className="facility-card">
                    <div className="facility-icon">🏥</div>
                    <h4>Hospitals</h4>
                    <p className="facility-count">{healthcareResults.hospitals}</p>
                  </div>
                  <div className="facility-card">
                    <div className="facility-icon">🏢</div>
                    <h4>Primary Care</h4>
                    <p className="facility-count">{healthcareResults.primaryCareCenters}</p>
                  </div>
                  <div className="facility-card">
                    <div className="facility-icon">🚑</div>
                    <h4>Emergency Centers</h4>
                    <p className="facility-count">{healthcareResults.emergencyCenters}</p>
                  </div>
                  <div className="facility-card">
                    <div className="facility-icon">👨‍⚕️</div>
                    <h4>Specialists</h4>
                    <p className="facility-count">{healthcareResults.specialistsCount}</p>
                  </div>
                </div>
              </div>

              {/* Resource Metrics */}
              <div className="resource-metrics-section">
                <h3>📊 Resource Metrics vs WHO Standards</h3>
                <div className="resource-grid">
                  <div className="resource-card">
                    <h4>🛏️ Hospital Beds</h4>
                    <div className="resource-comparison">
                      <div className="current-value">
                        <span className="value-label">Current</span>
                        <span className="value-number">{healthcareResults.bedsPerThousand}</span>
                        <span className="value-unit">per 1,000</span>
                      </div>
                      <div className="comparison-arrow">→</div>
                      <div className="target-value">
                        <span className="value-label">WHO Target</span>
                        <span className="value-number">{healthcareResults.whoBedsPer1000}</span>
                        <span className="value-unit">per 1,000</span>
                      </div>
                    </div>
                    <div className="resource-gap">
                      <p>Gap: <strong>{healthcareResults.bedsGap}</strong> beds needed</p>
                    </div>
                  </div>

                  <div className="resource-card">
                    <h4>👨‍⚕️ Doctors</h4>
                    <div className="resource-comparison">
                      <div className="current-value">
                        <span className="value-label">Current</span>
                        <span className="value-number">{healthcareResults.doctorsPerThousand}</span>
                        <span className="value-unit">per 1,000</span>
                      </div>
                      <div className="comparison-arrow">→</div>
                      <div className="target-value">
                        <span className="value-label">WHO Target</span>
                        <span className="value-number">{healthcareResults.whoDoctorsPer1000}</span>
                        <span className="value-unit">per 1,000</span>
                      </div>
                    </div>
                    <div className="resource-gap">
                      <p>Gap: <strong>{healthcareResults.doctorsGap}</strong> doctors needed</p>
                    </div>
                  </div>

                  <div className="resource-card">
                    <h4>🏥 Facilities</h4>
                    <div className="resource-comparison">
                      <div className="current-value">
                        <span className="value-label">Current</span>
                        <span className="value-number">{healthcareResults.facilitiesPer100k}</span>
                        <span className="value-unit">per 100K</span>
                      </div>
                      <div className="comparison-arrow">→</div>
                      <div className="target-value">
                        <span className="value-label">WHO Target</span>
                        <span className="value-number">{healthcareResults.whoFacilitiesPer100k}</span>
                        <span className="value-unit">per 100K</span>
                      </div>
                    </div>
                    <div className="resource-gap">
                      <p>Gap: <strong>{healthcareResults.facilitiesGap}</strong> facilities needed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Underserved Areas */}
              {healthcareResults.underservedAreas && healthcareResults.underservedAreas.length > 0 && (
                <div className="underserved-section">
                  <h3>⚠️ Underserved Areas</h3>
                  <div className="underserved-list">
                    {healthcareResults.underservedAreas.map((area, index) => (
                      <div key={index} className="underserved-item">
                        <span className="area-icon">📍</span>
                        <span className="area-name">{area}</span>
                        <span className="priority-badge">High Priority</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Locations */}
              {healthcareResults.recommendedLocations && healthcareResults.recommendedLocations.length > 0 && (
                <div className="recommended-locations-section">
                  <h3>📍 Recommended New Facility Locations</h3>
                  <div className="locations-grid">
                    {healthcareResults.recommendedLocations.map((location, index) => (
                      <div key={index} className="location-card">
                        <div className="location-header">
                          <span className="location-number">#{index + 1}</span>
                          <span className={`priority-badge ${location.priority.toLowerCase()}`}>
                            {location.priority}
                          </span>
                        </div>
                        <div className="location-details">
                          <p><strong>Type:</strong> {location.recommendedType}</p>
                          <p><strong>Coordinates:</strong> {location.lat.toFixed(4)}, {location.lon.toFixed(4)}</p>
                          <p><strong>Est. Population Served:</strong> {location.estimatedServedPopulation.toLocaleString()}</p>
                          <p><strong>Est. Cost:</strong> {location.estimatedCost}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quality Metrics */}
              <div className="quality-metrics-section">
                <h3>⭐ Quality Metrics</h3>
                <div className="quality-grid">
                  <div className="quality-item">
                    <span className="quality-label">Average Wait Time</span>
                    <span className="quality-value">{healthcareResults.avgWaitTime} min</span>
                  </div>
                  <div className="quality-item">
                    <span className="quality-label">Total Beds</span>
                    <span className="quality-value">{healthcareResults.totalBeds.toLocaleString()}</span>
                  </div>
                  <div className="quality-item">
                    <span className="quality-label">Total Doctors</span>
                    <span className="quality-value">{healthcareResults.totalDoctors.toLocaleString()}</span>
                  </div>
                  <div className="quality-item">
                    <span className="quality-label">Total Nurses</span>
                    <span className="quality-value">{healthcareResults.totalNurses.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="recommendations-section">
                <h3>💡 AI-Powered Recommendations</h3>
                <div className="recommendations-list">
                  {healthcareResults.recommendations.map((rec, index) => (
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
                <p className="data-source-text">{healthcareResults.dataSource}</p>
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
              <h4>1️⃣ Facility Mapping</h4>
              <p>healthsites.io database provides comprehensive healthcare facility locations globally</p>
            </div>
            <div className="method-card">
              <h4>2️⃣ Drive-Time Analysis</h4>
              <p>Openrouteservice API calculates realistic drive-time isolines using road networks</p>
            </div>
            <div className="method-card">
              <h4>3️⃣ Population Overlay</h4>
              <p>GHS-POP data overlays population distribution to calculate coverage percentages</p>
            </div>
            <div className="method-card">
              <h4>4️⃣ Gap Analysis</h4>
              <p>WHO standards comparison identifies resource gaps and optimal facility locations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Healthcare;
