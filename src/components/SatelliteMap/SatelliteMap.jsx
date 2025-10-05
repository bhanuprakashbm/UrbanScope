import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './SatelliteMap.css';

function SatelliteMap({ city, dataset, date }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const cityCoordinates = {
    'New York': [40.7128, -74.0060],
    'London': [51.5074, -0.1278],
    'Tokyo': [35.6762, 139.6503],
    'Delhi': [28.7041, 77.1025],
    'São Paulo': [-23.5505, -46.6333],
    'Mumbai': [19.0760, 72.8777]
  };

  const gibsLayers = {
    modis: 'MODIS_Terra_Land_Surface_Temp_Day',
    ndvi: 'MODIS_Terra_NDVI_8Day',
    aerosol: 'MODIS_Terra_Aerosol',
    nightlights: 'VIIRS_SNPP_DayNightBand_ENCC'
  };

  useEffect(() => {
    if (!mapRef.current || !city) return;

    const coords = cityCoordinates[city] || [28.7041, 77.1025];
    
    // Initialize map if not already created
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: coords,
        zoom: 10,
        zoomControl: true,
        attributionControl: true
      });

      // Add base layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(mapInstanceRef.current);
    } else {
      // Update map center
      mapInstanceRef.current.setView(coords, 10);
    }

    // Add NASA GIBS layer
    const gibsLayer = gibsLayers[dataset] || gibsLayers.modis;
    const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${gibsLayer}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`;

    // Remove existing GIBS layers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer.options && layer.options.className === 'gibs-layer') {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add new GIBS layer
    L.tileLayer(gibsUrl, {
      attribution: 'NASA GIBS',
      opacity: 0.7,
      className: 'gibs-layer',
      maxZoom: 9
    }).addTo(mapInstanceRef.current);

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.eachLayer((layer) => {
          if (layer.options && layer.options.className === 'gibs-layer') {
            mapInstanceRef.current.removeLayer(layer);
          }
        });
      }
    };
  }, [city, dataset, date]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="satellite-map-container">
      <div ref={mapRef} className="satellite-map"></div>
      <div className="map-overlay">
        <div className="overlay-info">
          <span className="overlay-label">🛰️ NASA GIBS</span>
          <span className="overlay-city">{city}</span>
        </div>
      </div>
    </div>
  );
}

export default SatelliteMap;
