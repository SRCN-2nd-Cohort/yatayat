mapboxgl.accessToken = 'pk.eyJ1IjoibGFsaXR4MTciLCJhIjoiY2wyMzJzOWI4MGwwODNqbzFld2NyOGxoOCJ9.xXjxDFpc0Lg9xeexzEfbMA';

const nav = new mapboxgl.NavigationControl({
  showCompass: true,
  showZoom: true,
  visualizePitch: true
});


// to get the current location of the user
navigator.geolocation.getCurrentPosition(successLocation,
  errorLocation, {
    enableHighAccuracy: true
  })

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([27.2046, 77.4977]);
}


function setupMap(center) {
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: center, // starting position [lng, lat]
    zoom: 15 // starting zoom
  });
  map.addControl(nav, 'bottom-right');
  // Add the control to the map.
//   map.addControl(
//   new MapboxGeocoder({
//   accessToken: mapboxgl.accessToken,
// }),
// "top-left");
//
// // Add the control to the map.
// map.addControl(
// new MapboxGeocoder({
// accessToken: mapboxgl.accessToken,
// }),
// "top-left");
map.addControl(
new MapboxDirections({
accessToken: mapboxgl.accessToken
}),
'top-left'
);
}
