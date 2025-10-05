import React, { useEffect, useRef } from 'react';
import './GoogleMaps3D.css';

function GoogleMaps3D({ coordinates, city }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!coordinates || !window.google) return;

    const [lat, lng] = coordinates;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 16,
        mapTypeId: 'satellite',
        tilt: 45,
        heading: 0,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });
    } else {
      // Update existing map
      mapInstanceRef.current.setCenter({ lat, lng });
    }

    // Add marker
    new window.google.maps.Marker({
      position: { lat, lng },
      map: mapInstanceRef.current,
      title: city || 'Selected Location',
    });

  }, [coordinates, city]);

  return (
    <div className="google-maps-3d-container">
      <div ref={mapRef} className="google-maps-3d"></div>
    </div>
  );
}

export default GoogleMaps3D;
