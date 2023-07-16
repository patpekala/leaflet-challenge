// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });

function createFeatures(earthquakeData) {
 // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  function createCircle(feature, latlng) {
    let magnitude = feature.properties.mag;
    let depth = feature.geometry.coordinates[2];
    
    function getMarkerSize(magnitude) {
        return magnitude * 4;
    }

    function getMarkerColor(depth) {
        if (depth < 10) {
            return "#00ff00"; // Green
            } else if (depth < 30) {
            return "#ffff00"; // Yellow
            } else if (depth < 50) {
            return "#ff9900"; // Orange
            } else {
            return "#ff0000"; // Red
            }
    }

      // Create the marker 
    let marker = L.circleMarker(latlng, {
        radius: getMarkerSize(magnitude),
        fillColor: getMarkerColor(depth),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    });

    return marker;
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature and createCircle function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: createCircle
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) { 

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })


  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a legend control.
  let legend = L.control({
    position: 'bottomright'
  });

  // Define the legend content and behavior.
  legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'legend');
    let depths = [0, 10, 30, 50];
    let labels = [];
    
  // Loop through the depths and generate a label with color for each range.
  for (let i = 0; i < depths.length; i++) {
    // Need to insert code 
  legend.addTo(myMap);
}

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  }
  
// A legend showing the depth and their corresponding color (10 points)

// Each point has a tooltip with the Magnitude, the location and depth (10 points)
