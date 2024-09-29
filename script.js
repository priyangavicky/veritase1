var map = L.map('map').setView([25.276987, 55.296249], 13);  // Dubai coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([25.276987, 55.296249]).addTo(map);

function searchLocation(query) {
    L.Control.Geocoder.nominatim().geocode(query, function(results) {
        if (results.length > 0) {
            var result = results[0];

            map.removeLayer(marker);
            var circle = L.circle(result.center, {
                color: 'red',          
                fillColor: '#f03',   
                fillOpacity: 0.5,      
                radius: 100          
            }).addTo(map);
            marker = L.marker(result.center).addTo(map);

            map.setView(result.center, 13);

            marker.bindPopup("<b>Location found: </b>" + result.name).openPopup();
        } else {
            alert("Location not found");
        }
    });
}

document.getElementById('location-search').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        var location = e.target.value;
        searchLocation(location);
    }
});
