import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

const Map = ({ lng, setLng, lat, setLat, zoom, setZoom }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);

  return (
    <div className="map-container container-fluid" ref={mapContainerRef} />
  );
};

export default Map;
