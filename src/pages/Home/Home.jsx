import React from 'react'
import Hero from '../../components/Hero/Hero.jsx'
import './Home.css'

function Home() {
    return (
        <div className="home-page">
            <Hero />
            
            {/* AI Models Section */}
            <section className="ai-models-section">
                <div className="container">
                    <h2 className="section-title">🤖 AI-Powered Urban Health Analysis</h2>
                    <p className="section-subtitle">
                        Explore our three core AI models for comprehensive urban health assessment
                    </p>
                    
                    <div className="models-grid">
                        <a href="/heat-risk" className="model-card heat-card">
                            <div className="model-icon">🌡️</div>
                            <h3>Urban Heat Risk Index</h3>
                            <p>AI-powered analysis of urban heat islands and their impact on public health</p>
                            <div className="model-features">
                                <span className="feature-tag">Land Surface Temperature</span>
                                <span className="feature-tag">Population Vulnerability</span>
                                <span className="feature-tag">Tree Coverage</span>
                            </div>
                            <button className="explore-btn">Explore Heat Risk →</button>
                        </a>

                        <a href="/green-space" className="model-card green-card">
                            <div className="model-icon">🌳</div>
                            <h3>Green Space Exposure</h3>
                            <p>Comprehensive assessment using GreenEx_Py's three-perspective methodology</p>
                            <div className="model-features">
                                <span className="feature-tag">Availability</span>
                                <span className="feature-tag">Accessibility</span>
                                <span className="feature-tag">Visibility</span>
                            </div>
                            <button className="explore-btn">Explore Green Space →</button>
                        </a>

                        <a href="/healthcare" className="model-card healthcare-card">
                            <div className="model-icon">🏥</div>
                            <h3>Healthcare Access Analysis</h3>
                            <p>Drive-time isoline analysis and population-based accessibility assessment</p>
                            <div className="model-features">
                                <span className="feature-tag">Facility Mapping</span>
                                <span className="feature-tag">Drive-Time Analysis</span>
                                <span className="feature-tag">Coverage</span>
                            </div>
                            <button className="explore-btn">Explore Healthcare →</button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">✨ Key Features</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">🛰️</div>
                            <h4>Real-Time Satellite Data</h4>
                            <p>NASA GIBS integration with MODIS, Landsat, and Sentinel imagery</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🤖</div>
                            <h4>AI-Powered Analysis</h4>
                            <p>Advanced algorithms for heat risk, green space, and healthcare assessment</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🏙️</div>
                            <h4>3D Visualization</h4>
                            <p>Interactive 3D city models with real-time data representation</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">📈</div>
                            <h4>Future Predictions</h4>
                            <p>5-year trend forecasting with intervention impact analysis</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Sources Section */}
            <section className="data-sources-section">
                <div className="container">
                    <h2 className="section-title">📡 Data Sources</h2>
                    <div className="sources-grid">
                        <div className="source-card">
                            <div className="source-icon">🛰️</div>
                            <h3>NASA GIBS</h3>
                            <p>Global Imagery Browse Services</p>
                        </div>
                        <div className="source-card">
                            <div className="source-icon">🌍</div>
                            <h3>NASA EARTHDATA</h3>
                            <p>Comprehensive Earth science data</p>
                        </div>
                        <div className="source-card">
                            <div className="source-icon">📡</div>
                            <h3>Copernicus Sentinel</h3>
                            <p>European Space Agency satellites</p>
                        </div>
                        <div className="source-card">
                            <div className="source-icon">🗺️</div>
                            <h3>OpenStreetMap</h3>
                            <p>Community-driven mapping data</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home