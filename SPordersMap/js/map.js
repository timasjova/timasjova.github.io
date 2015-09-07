var Map = {
    map: null,
    heatmap: null,
    markers: [],
    infoWindows: [],
    markersShown: false,
    heatmapShown: true,
    clustersShown: false,
    heatmapData: [],
    markerClusterer: null,
    heatmapType: null,
	
    reset: function() {
        Map.clearMarkers();
        Map.heatmap.setMap(null);
        Map.infoWindows = [];
        Map.markers = [];
        $("#totalMarkers").text("Total markers on the map:");
        $("#totalQuantity").text("Total quantity on the map:");
        $("#mList").empty();
        Map.clearClusters();
        Data.quantity = 0;
    },
    initialize: function() {
        this.initializeMap();
        this.initializeMapButtons();
    },
    initializeMapButtons: function() {
        $("#toggleHeatmap").click(function() {
            if (Map.heatmap.getMap()) {
                Map.heatmapShown = false;
                Map.heatmap.setMap(null);
            } else {
                Map.heatmapShown = true;
                Map.heatmap.setMap(Map.map);
            }
            if ($(this).text() == "Show heatmap") {
                $(this).text("Hide heatmap");
            } else {
                $(this).text("Show heatmap");
            }
        });
        $("#toggleMarkers").click(function() {
            if (Map.markersShown) {
                Map.markersShown = false;
                Map.clearMarkers();
                $("#totalMarkers").text("Total markers on the map:");
                $("#totalMarkers").hide();
            } else {
                Map.markersShown = true;
                Map.addMarkers(Map.map);
                $("#totalMarkers").append("<b>" + Map.markers.length + "</b>");
                $("#totalMarkers").show();
            }
            if ($(this).text() == "Show markers") {
                $(this).text("Hide markers");
            } else {
                $(this).text("Show markers");
            }
        });
        $("#toggleClusters").click(function() {
            if (Map.clustersShown) {
                Map.clearClusters();
                Map.clustersShown = false;
            } else {
                Map.clustersShown = true;
                Map.addClusters();
            }
            if ($(this).text() == "Show clusters") {
                $(this).text("Hide clusters");
            } else {
                $(this).text("Show clusters");
            }
        });
        $('#mapType').click(function() {
            if (Map.map.mapTypeId == "roadmap") {
                Map.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
            } else {
                Map.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            }
            if ($(this).text() == "Satellite") {
                $(this).text("Roadmap");
            } else {
                $(this).text("Satellite");
            }
        });
    },
    createInfoWindow: function(data) {
        var infoWindow = new google.maps.InfoWindow({
            content: Map.getInfoWindowContent(data)
        });
        Map.infoWindows.push(infoWindow);
    },
    createMarker: function(latlng, infoWindowPosition) {
        var marker = new google.maps.Marker({
            position: latlng
        });
        google.maps.event.addListener(marker, 'click', function() {
            Map.infoWindows[infoWindowPosition].open(Map.map, marker);
        });
        Map.markers.push(marker);
    },
    addMarkers: function(markersLayer) {
        for (i = 0; i < Map.markers.length; i++) {
            Map.markers[i].setMap(markersLayer);
        };
    },
    addClusters: function(markersLayer) {
        for (i = 0; i < Map.markers.length; i++) {
            Map.markers[i].setMap(markersLayer);
        };
        Map.markerClusterer = new MarkerClusterer(Map.map, Map.markers);
    },
    clearMarkers: function() {
        Map.addMarkers(null);
    },
    clearClusters: function() {
        if (Map.clustersShown) {
            Map.markerClusterer.clearMarkers();
        }
    },
    getInfoWindowContent: function(data) {
        return '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<div id="bodyContent">' + '<ul>' + '<li>Item: ' + data.Item + '</li>' + '<li>Vendor: ' + data.Vendor + '</li>' + '<li>Country: ' + data.Country + '</li>' + '<li>Quantity: ' + data.Quantity + ' tons</li>' + '<li>Year: ' + data.Year + '</li>' + '<li>City: ' + data.City + '</li>' + '</ul>' + '</div>' + '</div>';
    },
    initializeMap: function() {
        var mapOptions = {
            zoom: 4,
            mapTypeId: google.maps.MapTypeId["ROADMAP"],
            center: new google.maps.LatLng(50, 0),
            panControl: false,
            zoomControl: true,
            scaleControl: false,
            mapTypeControl: false,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            streetViewControl: false,
            styles: [{
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "hue": "#000000"
                }, {
                    "saturation": -100
                }, {
                    "lightness": -100
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "hue": "#000000"
                }, {
                    "saturation": -100
                }, {
                    "lightness": -100
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{
                    "hue": "#000000"
                }, {
                    "saturation": 0
                }, {
                    "lightness": -100
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#ffffff"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#000000"
                }, {
                    "saturation": -100
                }, {
                    "lightness": -100
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [{
                    "hue": "#ffffff"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffffff"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#000000"
                }, {
                    "saturation": 0
                }, {
                    "lightness": -100
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#000000"
                }, {
                    "saturation": -100
                }, {
                    "lightness": -100
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#bbbbbb"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 26
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#dddddd"
                }, {
                    "saturation": -100
                }, {
                    "lightness": -3
                }, {
                    "visibility": "on"
                }]
            }]
        };
        Map.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        for (var i in data) {
            Data.populateDataset(data[i]);
        }
        google.maps.event.addDomListener(window, 'load');
    }
};