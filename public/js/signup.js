const key = 'AIzaSyAsYiqosklWD2b6tlht6yGiurSUdeFKvZE';
const input = document.querySelector('#location');
const signupForm = document.querySelector("#signup-form");
const signupUserButton = document.querySelector("#signup-user-button");

// Global autocomplete for broad scope access
let autocomplete;
let coordinates;

signupForm.addEventListener("submit", async function(event) {
    const email = document.querySelector("#email").value.trim();
    const name = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    const lat = coordinates.lat;
    const lon = coordinates.lon;

    // Ensure coordinates were caught
    // if (coordinates.code === 200) {
        
    // } else {
    //     errorButton(coordinates.message);
    //     return;
    // }

    const response = fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, lat, lon }),
        headers: { 'Content-Type': 'application/json' },
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.id) {
                signupUserButton.classList.remove("btn-dark");
                signupUserButton.classList.add("btn-success");
                signupUserButton.textContent = "Success!";
                setTimeout(function () {
                    //
                }, 3000);
            } else {
                errorButton("Please try again");
            }
        }
    );
});
  
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
        const location = document.querySelector("#location").value.trim();
        coordinates = getCoordinates(location);
    }
}

const searchBox = new google.maps.places.SearchBox(input);

async function getCoordinates(placeText) {
    // Format text for geocoding
    const formattedText = placeText.replace(" ", "%20");
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedText}&key=${key}`

    const response = await fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        if (data.status === "OK") {
            const coordinateData = { 
                code: 200, 
                lat: data.geometry.location.lat,
                lon: data.geometry.location.lon
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

function errorButton(message) {
    signupUserButton.classList.remove("btn-dark");
    signupUserButton.classList.add("btn-danger");
    signupUserButton.textContent = message;
    setTimeout(function () {
    signupUserButton.classList.remove("btn-danger");
    signupUserButton.classList.add("btn-dark");
    signupUserButton.textContent = "Signup";
    }, 4000);
}



// https://developers.google.com/maps/documentation/geocoding/requests-geocoding#geocoding-lookup