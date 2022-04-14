// Constants
const CENTER = [-3.7073944, 40.6042722];
const INIT_ZOOM = 13;
const INIT_PITCH = 60;
const API_KEY = 'pk.eyJ1Ijoiam9yZ2VobzE5OTUiLCJhIjoiY2poYnF2cHhqMDMxejMwbzY4dWt0Mmw3YSJ9.6veUQBwHSWY6BQvvfDKX2A';

// Create Map
mapboxgl.accessToken = API_KEY;
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: CENTER,
  zoom: INIT_ZOOM,
  pitch: INIT_PITCH
});

// Add zoom and rotation controls to the map.
map.addControl(
  new mapboxgl.NavigationControl(),
  'bottom-right'
);

// Add directions control
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }),
  'top-left'
);

// Function to open/close sidebars
function toggleSidebar(id) {
  const elem = document.getElementById(id);
  const collapsed = elem.classList.toggle('collapsed');
  const padding = {};
  padding[id] = collapsed ? 0 : 300; 
  map.easeTo({
    padding: padding,
    duration: 1000
  });
}