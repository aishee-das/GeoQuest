// Initialize the map and set default view centered on Europe
var map = L.map('map').setView([54.5260, 15.2551], 4); // Centered on Europe with zoom level 4

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    noWrap: true
}).addTo(map);

// Global variables
var circle;
var markers = [];
var selectedCategories = [];
var searchRadius = 1000; // Default radius in meters
var currentLat = null, currentLon = null;

// Function to geocode postcode
function geocodePostcode(postcode) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(postcode)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                currentLat = parseFloat(data[0].lat);
                currentLon = parseFloat(data[0].lon);
                alert(`Location set to: ${data[0].display_name}`);
            } else {
                alert('Postcode not found!');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function () {
    var postcode = document.getElementById('postcode').value.trim();
    if (postcode) {
        geocodePostcode(postcode);
    } else {
        alert('Please enter a postcode.');
    }
});

// Function to get current location
function getCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentLat = position.coords.latitude;
            currentLon = position.coords.longitude;
            alert('Current location set.');
        }, function (error) {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Event listener for location button
document.getElementById('location-btn').addEventListener('click', function () {
    getCurrentLocation();
});

// Event listener for distance slider
var distanceSlider = document.getElementById('distance-slider');
var distanceValue = document.getElementById('distance-value');
distanceSlider.addEventListener('input', function () {
    searchRadius = parseInt(this.value);
    distanceValue.textContent = this.value + 'm';
});

// Event listeners for category buttons
var categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Toggle active class
        this.classList.toggle('active');
        var category = this.getAttribute('data-category');
        if (this.classList.contains('active')) {
            selectedCategories.push(category);
        } else {
            selectedCategories = selectedCategories.filter(function (item) {
                return item !== category;
            });
        }
    });
});

// Event listener for "Show Me the Quests" button
document.getElementById('show-quests-btn').addEventListener('click', function () {
    if (currentLat && currentLon) {
        zoomToLocation(currentLat, currentLon);
        addCircle(currentLat, currentLon, searchRadius);
        fetchPOIs(currentLat, currentLon, selectedCategories, searchRadius);
    } else {
        alert('Please set your location using "Use My Current Location" or "Enter Postcode".');
    }
});

// Function to zoom to a given location
function zoomToLocation(lat, lon) {
    map.setView([lat, lon], 13); // Zoom level 13 for city-level view
}

// Function to add a circle with a set radius
function addCircle(lat, lon, radius) {
    // Remove existing circle if any
    if (circle) {
        map.removeLayer(circle);
    }
    // Add circle with the selected radius
    circle = L.circle([lat, lon], { radius: radius, color: '#3388ff', fillColor: '#3388ff', fillOpacity: 0.2 }).addTo(map);
}

// Function to fetch Points of Interest (POIs) using Overpass API
function fetchPOIs(lat, lon, categories, radius) {
    // Remove existing markers
    if (markers.length > 0) {
        markers.forEach(marker => {
            map.removeLayer(marker);
        });
        markers = [];
    }

    if (categories.length === 0) {
        // If no categories selected, default to 'restaurant'
        categories = ['restaurant'];
    }

    // Build Overpass API query for selected categories
    var overpassQueries = categories.map(function (category) {
        if (category === 'restaurant') {
            return `node["amenity"="restaurant"][name](around:${radius},${lat},${lon});`;
        } else if (category === 'landmark') {
            // Fetch elements with 'historic' or 'tourism=attraction' AND with a 'name' tag
            return `
                (
                    node["historic"][name](around:${radius},${lat},${lon});
                    node["tourism"="attraction"][name](around:${radius},${lat},${lon});
                    way["historic"][name](around:${radius},${lat},${lon});
                    way["tourism"="attraction"][name](around:${radius},${lat},${lon});
                    relation["historic"][name](around:${radius},${lat},${lon});
                    relation["tourism"="attraction"][name](around:${radius},${lat},${lon});
                );
            `;
        }
        // ... (handle other categories)
    }).join('');

    var query = `[out:json];
        ${overpassQueries}
        out center;
    `;

    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
    })
        .then(response => response.json())
        .then(data => {
            if (data.elements.length === 0) {
                alert('No landmarks found within the current radius. Please increase the radius or select a different location.');
            } else {
                addMarkers(data.elements);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to add markers to the map
function addMarkers(pois) {
    pois.forEach(poi => {
        let lat, lon;
        if (poi.type === 'node') {
            lat = poi.lat;
            lon = poi.lon;
        } else if (poi.type === 'way' || poi.type === 'relation') {
            // For ways and relations, use the centroid
            if (poi.center) {
                lat = poi.center.lat;
                lon = poi.center.lon;
            } else {
                // If no center is provided, skip this element
                return;
            }
        } else {
            // Unknown type, skip
            return;
        }

        var marker = L.marker([lat, lon]).addTo(map);
        var name = poi.tags.name || 'Unnamed Place';
        var popupContent = `<b>${name}</b><br>
            <button onclick="addToQuest('${poi.type}_${poi.id}', '${name.replace(/'/g, "\\'")}')">Add to Quest</button>`;
        marker.bindPopup(popupContent);
        markers.push(marker);
    });
}


// Function to add POI to quest page
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
