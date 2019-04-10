mapboxgl.accessToken = 'pk.eyJ1IjoibWFya21pc2VuZXIiLCJhIjoiY2oyMHU1NXU1MDU1bzMycDgzcTd5YXNodCJ9.vs5478GgiPcqcJAOxAOFwA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mmisener/cjqg4nfhajk4e2qmtdpdhcic9',
    center: [-122.235584, 37.811882],
    maxZoom: 18,
    minZoom: 9,
    zoom: 10
});

map.on('load', function () {
    // Add a layer showing the places.
    map.addLayer({
        "id": "places",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                  {
                    "type": "Feature",
                    "properties": {
                        "description": "<strong>Hyatt Place Emeryville</strong>",
                        "icon": "home"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-122.29224444999099,37.83727206675705]
                    }
                  },

                  {
                    "type": "Feature",
                    "properties": {
                        "description": "<strong>Waterfront Hotel</strong>",
                        "icon": "home"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-122.27756321048909,37.794753996185605]
                    }
                  },

                  {
                    "type": "Feature",
                    "properties": {
                        "description": "<strong>Mills College</strong>",
                        "icon": "heart"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-122.18580809816167,37.782203624514]
                    }
                  }
                ]
              }
            },
        "layout": {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true,
            "icon-size": 2
        }
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'places', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });
});
