mapboxgl.accessToken = 'pk.eyJ1IjoibW1pc2VuZXIiLCJhIjoiY2o0ZTg4M2pzMDBqbDJ4cnZmNGxyZ2piZiJ9.ZIHGRjLYZxfmBQmWbXpgEg';
var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/mapbox/streets-v9',
    style: 'mapbox://styles/mmisener/cjjcaus0546um2sp8ueif4adq',
    center: [-122.399, 37.788],
    maxZoom: 18,
    minZoom: 9,
    zoom: 10
});

var title = document.getElementById('location-title');
var description = document.getElementById('location-description');
var image = document.getElementById('location-imageUrl');

var locations = [
  {
    "id": "0",
    "title": "Danville",
    "description": "Where Caroline grew up",
    "imageUrl": "images/map-1.jpg",
    "camera": {
        center: [-121.97741121053696,37.80969918975662],
        bearing: 28.4,
        zoom: 12,
        pitch: 50
      }
  },

  {
    "id": "1",
    "title": "Woodland",
    "description": "Where Mark grew up",
    "imageUrl": "images/map-2.jpg",
    "camera": {
        center: [-121.8110203742981,38.72080923046447],
        zoom: 10,
        pitch: 50
      }
  },

  {
    "id": "2",
    "title": "Sonoma State",
    "description": "Where we met",
    "imageUrl": "images/map-3.jpg",
    "camera": {
      center: [-122.6748,38.3386],
        zoom: 15,
        pitch: 50
      }
  },

  {
    "id": "3",
    "title": "Jack London",
    "description": "Our first apartment",
    "imageUrl": "images/map-4.jpg",
    "camera": {
        center: [-122.26883858442307,37.791135812760544],
        bearing: 25.3,
        zoom: 15,
        pitch: 50,
      }
  },

  {
    "id": "4",
    "title": "Lake Merritt",
    "description": "Our second apartment",
    "imageUrl": "images/map-5.jpg",
    "camera": {
        center: [-122.2633,37.8034],
        zoom: 16,
        pitch: 50
      }

  },

  {
    "id": "5",
    "title": "Alameda",
    "description": "Moved to Alameda",
    "imageUrl": "images/map-6.jpg",
    "camera": {
        center: [-122.2815978527069,37.778745623261614],
        zoom: 16,
        pitch: 50
      }
  },

 {
    "id": "6",
    "title": "La Sagrada Familia",
    "description": "The proposal",
    "imageUrl": "images/map-7.jpg",
    "camera": {
        center: [2.175164222717285,41.40466603499513],
        bearing: 90,
        zoom: 16,
        pitch: 50
      }
  },

  {
    "id": "7",
    "title": "Mills College",
    "description": "The wedding",
    "imageUrl": "images/map-8.jpg",
    "camera": {
      center: [-122.18574911355971,37.78220957403709],
      bearing: 28.4,
      zoom: 16,
      pitch: 50
    }
}];

function playback(index) {
    title.textContent = locations[index].title;
    description.textContent = locations[index].description;
    image.src = locations[index].imageUrl;

    // Animate the map position based on camera properties
    map.flyTo(locations[index].camera);

    map.once('moveend', function() {
        // Duration the slide is on screen after interaction
        window.setTimeout(function() {
            // Increment index
            index = (index + 1 === locations.length) ? 0 : index + 1;
            playback(index);
        }, 3000); // After callback, show the location for 3 seconds.
    });
}

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

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
      .setLngLat(marker.camera.center)
      .addTo(map);
    });

    var start = true;
    $(window).scroll(function() {
      var hT = $('#map').offset().top,
          hH = $('#map').outerHeight(),
          wH = $(window).height(),
          wS = $(this).scrollTop();
      if (wS > (hT+hH-wH) && start == true){
        // only start playback if it is the first scroll
        start = false;
        // Start the playback animation for each location
        playback(0);
      }
    });
  });
