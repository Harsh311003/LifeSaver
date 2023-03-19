import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import icon from "../img/ambulance.png";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

const Map = ({ lng, setLng, lat, setLat, zoom, setZoom, socket }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.loadImage(icon, (e, icon) => {
      if (e) throw e;
      map.addImage("icon", icon);
    });

    socket.on("driversLocation", (res) => {
      // setambulances(ambulances);

      if (!res) return;

      const ambulances = {
        type: "FeatureCollection",
        features: [],
      };

      res.ambulances.forEach((ambulance) => {
        const coords = [
          ambulance.location.longitude,
          ambulance.location.latitude,
        ];

        ambulances.features.push({
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: coords,
            properties: {
              icon: icon,
            },
          },
        });
      });

      // Adding ambulance layer on map

      if (map.getLayer("ambulances")) {
        map.getSource("ambulances").setData(ambulances);
      } else {
        map.addLayer({
          id: "ambulances",
          type: "symbol",
          source: {
            type: "geojson",
            data: ambulances,
          },
          layout: {
            "icon-image": "icon",
            "icon-allow-overlap": true,
          },
        });
      }

      console.log(res.ambulances);
    });

    return () => map.remove();
  }, [lat, lng]);

  return (
    <div className="map-container container-fluid" ref={mapContainerRef} />
  );
};

export default Map;
