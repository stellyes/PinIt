const homeInput = document.querySelector('#location');
const loginButton = document.querySelector("#site-login-button");
const logoutButton = document.querySelector("#site-logout-button");


 
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(homeInput,
      {
          types: ["establishment", "street_address", "postal_code"],
          fields: ["place_id", "geometry", "name"]
      }
  );

  autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged() {
  let place = autocomplete.getPlace();

  if (place.geometry) {
      const location = document.querySelector("#location").value.trim();
      coordinates = getCoordinates(location);
  }
}

const searchBox2 = new google.maps.places.SearchBox(homeInput);

function getCoordinates(placeText) {
  // Format text for geocoding
  const formattedText = placeText.replace(" ", "%20");
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedText}&key=${key}`

  const response = fetch(url).then(function(response) {
      return response.json();
  }).then(function(data) {
      if (data.status === "OK") {
          const coordinateData = { 
              code: 200, 
              lat: data.results[0].geometry.location.lat,
              lon: data.results[0].geometry.location.lon
          }
          return coordinateData;
      } else {
          const errorData = {
              code: 500,
              message: "Error retrieving coordinates"
          }
          return errorData;
      }
  });

  return response;
}
// https://developers.google.com/maps/documentation/geocoding/requests-geocoding#geocoding-lookup