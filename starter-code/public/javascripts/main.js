$(document).ready(function() {
  const lib = {
    lat: 48.86762229999999,
    lng: 2.346937900000057
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: lib
  });

  let markers = [];
  myPlaces.forEach(function(place) {
    let title = place.name;
    let position = {
      lat: place.location.coordinates[1],
      lng: place.location.coordinates[0]
    };
    var pin = new google.maps.Marker({ position, map, title });
    markers.push(pin);
  });

  const geocoder = new google.maps.Geocoder();

  document.getElementById("submit").addEventListener("click", function() {
    geocodeAddress(geocoder, map);
  });

  function geocodeAddress(geocoder, resultsMap) {
    let address = document.getElementById("address").value;

    geocoder.geocode({ address: address }, function(results, status) {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);
        let marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        document.getElementById(
          "latitude"
        ).value = results[0].geometry.location.lat();
        document.getElementById(
          "longitude"
        ).value = results[0].geometry.location.lng();
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
});
