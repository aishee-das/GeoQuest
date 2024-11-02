// Initialize the map and set view to the whole world initially
var map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Global variables
var circle;
var markers = [];

// Function to geocode postcode
function geocodePostcode(postcode) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(postcode)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var lat = data[0].lat;
                var lon = data[0].lon;
                zoomToLocation(lat, lon);
            } else {
                alert('Postcode not found!');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function() {
    var postcode = document.getElementById('postcode').value;
    if (postcode) {
        geocodePostcode(postcode);
    } else {
        alert('Please enter a postcode.');
    }
});

// Function to get current location
function getCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            zoomToLocation(lat, lon);
        }, function(error) {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Event listener for location button
document.getElementById('location-btn').addEventListener('click', function() {
    getCurrentLocation();
});

// Function to zoom to a given location
function zoomToLocation(lat, lon) {
    map.setView([lat, lon], 15); // Zoom level 15 for city-level view
    addCircle(lat, lon);
    fetchRestaurants(lat, lon);
}

// Function to add a circle with a set radius
function addCircle(lat, lon) {
    // Remove existing circle if any
    if (typeof circle !== 'undefined') {
        map.removeLayer(circle);
    }
    // Add circle with 1km radius
    circle = L.circle([lat, lon], { radius: 1000 }).addTo(map);
}

// Function to fetch restaurants using Overpass API
function fetchRestaurants(lat, lon) {
    // Overpass API query to get restaurants within 1km radius
    var query = `[out:json];
        node
          ["amenity"="restaurant"]
          (around:1000, ${lat}, ${lon});
        out;`;
    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
    })
        .then(response => response.json())
        .then(data => {
            addMarkers(data.elements);
        })
        .catch(error => console.error('Error:', error));
}

// Function to add markers to the map
function addMarkers(restaurants) {
    // Remove existing markers
    if (typeof markers !== 'undefined') {
        markers.forEach(marker => {
            map.removeLayer(marker);
        });
    }
    markers = [];
    restaurants.forEach(restaurant => {
        var marker = L.marker([restaurant.lat, restaurant.lon]).addTo(map);
        var popupContent = `<b>${restaurant.tags.name || 'Unnamed Restaurant'}</b><br>
            <button onclick="addToQuest('${restaurant.id}', '${restaurant.tags.name || 'Unnamed Restaurant'}')">Add to Quest</button>`;
        marker.bindPopup(popupContent);
        marker.on('mouseover', function(e) {
            this.openPopup();
        });
        // Removed the mouseout event handler to keep the popup open
        markers.push(marker);
    });
}

// Function to add restaurant to quest page
function addToQuest(id, name) {
    var quests = JSON.parse(localStorage.getItem('quests')) || [];
    if (!quests.find(q => q.id === id)) {
        quests.push({ id: id, name: name });
        localStorage.setItem('quests', JSON.stringify(quests));
        alert(`${name} has been added to your quest!`);
    } else {
        alert(`${name} is already in your quest.`);
    }
}
