// Constants
const CENTER = [-3.7073944, 40.6042722];
const INIT_ZOOM = 13;
const INIT_PITCH = 60;
const API_KEY = 'pk.eyJ1Ijoiam9yZ2VobzE5OTUiLCJhIjoiY2poYnF2cHhqMDMxejMwbzY4dWt0Mmw3YSJ9.6veUQBwHSWY6BQvvfDKX2A';
const URL_GET = 'http://localhost:8080/list';
// Global variables
let map;

// Run javascript
window.onload = function () {
  onLoadWeb();
};

// Load function
function onLoadWeb() {
  // Create map
  createMap();
  // Add restaurants to map
  loadRestaurants();
}

// Function to create map
function createMap() {
  // Create map
  mapboxgl.accessToken = API_KEY;
  map = new mapboxgl.Map({
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
    'top-right'
  );
}

// Function to load Restaurants to map
function loadRestaurants() {
  // Get all restaurants
  let rest;
  fetch(URL_GET)
    .then(data => { return data.json() })
    .then(res => { addRestaurantsToMap(res); addRestaurantsToSidebar(res); })
}

// Function to add restaurants to map
function addRestaurantsToMap(rest) {
  let marker;
  for (let i = 0; i < rest.length; i++) {
    marker = new mapboxgl.Marker()
      .setLngLat(rest[i]['coord'])
      .addTo(map)
  }
}

// Function to add restaurants to sidebar
function addRestaurantsToSidebar(rest) {
  let card;
  for (let i = 0; i < rest.length; i++) {
    card = '<div class="mdc-card"> ' +
      ' <div class="mdc-card__primary-action">' +
      '   <div class="mdc-card__media mdc-card__media--square">' +
      '     <div class="mdc-card__media-content">' + rest[i]['name'] + '</div>' +
      '   </div>' +
      '   <div class="mdc-card__ripple"></div>' + rest[i]['description'] +
      ' </div>' +
      ' <div class="mdc-card__actions">' +
      '   <div class="mdc-card__action-buttons">' +
      '     <button class="mdc-button mdc-card__action mdc-card__action--button">' +
      '       <div class="mdc-button__ripple"></div>' +
      '       <span class="mdc-button__label">Go to</span>' +
      '     </button>' +
      '     <button class="mdc-button mdc-card__action mdc-card__action--button">' +
      '       <div class="mdc-button__ripple"></div>' +
      '       <span class="mdc-button__label">Directions</span>' +
      '     </button>' +
      '   </div>' +
      '   <div class="mdc-card__action-icons">' +
      '     <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Share">share</button>' +
      '     <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="More options">more_vert</button>' +
      '   </div>' +
      ' </div>' +
      '</div>';
      //document.getElementById("restaurants").innerHTML += card;
  }
}