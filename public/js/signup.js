// Global autocomplete for broad scope access
let autocomplete;
let input = document.querySelector('#location');

// Bounds for autocomplete
// var defaultBounds = new google.maps.LatLngBounds(
//     new google.maps.LatLng(-33.8902, 151.1759),
//     new google.maps.LatLng(-33.8474, 151.2631));
  
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(input,
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
        console.log(place.geometry.location);
    }
}

var searchBox = new google.maps.places.SearchBox(input);



// https://developers.google.com/maps/documentation/geocoding/requests-geocoding#geocoding-lookup