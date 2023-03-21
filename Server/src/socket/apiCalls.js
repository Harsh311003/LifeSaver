const mapboxgl = require('mapbox-gl');
const axios = require('axios');

mapboxgl.accessToken = process.env.MAPBOX_API;

const getDuration = (start = [-84.518641,39.134270], end = [-84.512023,39.102779]) => {

    console.log(mapboxgl.accessToken);

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    axios.get(url).then((res) => {
        const data = res.data.routes[0];
        console.log(data.duration,data.geometry.coordinates)

        return {data: {
            route: data.geometry.coordinates,
            duration: data.duration
        }}
    }).catch((e) => {
        return {error: e};
    })
}

const getShortestPathAmbulance = (ambulances) => {
    if(ambulances.length === 0) return {error: 'No ambulance available'}

    var currentAmbulance = ambulances[0];
    ambulances.forEach((ambulance) => {
        if(ambulance.duration < currentAmbulance.duration){
            currentAmbulance = ambulance;
        }
    })

    return {ambulance: currentAmbulance};
}

module.exports = {getDuration, getShortestPathAmbulance};