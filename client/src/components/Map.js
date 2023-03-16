import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

const Map = () => {
    const mapContainerRef = useRef(null);
    const [lng, setLng] = useState(80.9462);
    const [lat, setLat] = useState(26.8467);
    const [zoom, setZoom] = useState(16);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        return () => map.remove();
    },[])

    return (
        <div className='map-container' ref={mapContainerRef} />
    );
}

export default Map;
