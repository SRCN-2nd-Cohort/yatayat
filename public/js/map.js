mapboxgl.accessToken =
  "pk.eyJ1IjoibGFsaXR4MTciLCJhIjoiY2wyMzNyNWY5MDUzdDNpcWtsb2xieTVwNCJ9.sjyS81tClREPljDILNY4hg";

  const nav = new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: true,
    visualizePitch: true
  });


navigator.geolocation.getCurrentPosition(function (position) {
  let point = position.coords;
  setupMap([point.longitude, point.latitude]);
}, function (e) {
  setupMap([85.32046,27.69463]);
  console.log("Hell No");
}, {
    enableHighAccuracy: true
});
  


function setupMap(center){
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 13,
  });

  map.addControl(nav, 'bottom-right');

var directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  unit: "metric",
  profile: "mapbox/driving",
});

map.addControl(directions, "top-left");

map.addControl(
  new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true
  })
  );



directions.on("route", (e) => {
  var routes = e.route;
  var location = directions.getOrigin();
  var destination = directions.getDestination();
  document.getElementById('distance').value = routes[0].distance;
  document.getElementById('originLat').value = location.geometry.coordinates[0];
  document.getElementById('originLong').value = location.geometry.coordinates[1];
  document.getElementById('destinationLat').value = destination.geometry.coordinates[0];
  document.getElementById('destinationLong').value = destination.geometry.coordinates[1];
});
};





/* directions.on('route', e => {
  // routes is an array of route objects as documented here:
  // https://docs.mapbox.com/api/navigation/#route-object:
        let routes = e.route
        console.log(routes);
          routes.map(r => r.legs[0].steps[0].name)//get the origin
          tail=routes.map(r => r.legs[0].steps.length)//get length of instructions
          routes.map(r => r.legs[0].steps[tail-1].name)//get destination
        }); */