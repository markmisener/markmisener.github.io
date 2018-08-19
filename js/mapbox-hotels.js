mapboxgl.accessToken = 'pk.eyJ1IjoibWFya21pc2VuZXIiLCJhIjoiY2oyMHU1NXU1MDU1bzMycDgzcTd5YXNodCJ9.vs5478GgiPcqcJAOxAOFwA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-122.2729,37.8021],
    maxZoom: 18,
    minZoom: 9,
    zoom: 10
});

var locations = [
  {
    "title": "Waterfront Hotel",
    "geometry": {
        "type": "Point",
        "center":  [-122.278600,37.794910]
      }
  },

  {
    "title": "Oakland Marriott City Center",
    "geometry": {
        "type": "Point",
        "center": [-122.2729,37.8021],
      }
  },

  {
    "title": "Courtyard by Marriott Oakland Emeryville",
    "geometry": {
        "type": "Point",
        "center":  [-122.2937,37.8348],
      }
  },

  {
    "title": "Hampton Inn & Suites Oakland Airport - Alameda",
    "geometry": {
        "type": "Point",
        "center":  [-122.242280,37.724510]
      }
  },

  {
    "title": "The Marina Inn on San Francisco Bay",
    "geometry": {
        "type": "Point",
        "center":  [-122.189460,37.700530]
      }
  },

  {
    "title": "Mills College",
    "geometry": {
        "type": "Point",
        "center":  [-122.169170,37.767140]
      }
  }
];

map.on('load', function() {

  map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': {
              'type': 'identity',
              'property': 'height'
          },
          'fill-extrusion-base': {
              'type': 'identity',
              'property': 'min_height'
          },
          'fill-extrusion-opacity': .6
      }
    })

  // add markers to map
  locations.forEach(function(marker) {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';
      // TODO: change all markers (except Mills) to a different icon
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.center)
        .addTo(map);
    });
});
