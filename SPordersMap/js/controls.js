var Controls = {
    leftControlsValue: 2007,
    rightControlsValue: 2014,
    showHeatmapAndMarkers: function() {
        var heatmapLonLat = [];
        for (var i in Data.datasetToShow) {
            var latlng = new google.maps.LatLng(Data.datasetToShow[i].Lat, Data.datasetToShow[i].Lon);
            if (Map.heatmapType == "Weight heatmap") {
                console.log("1");
                heatmapLonLat.push({
                    location: latlng,
                    weight: Data.datasetToShow[i].Quantity / 100
                });
            } else {
                console.log("2");
                heatmapLonLat.push({
                    location: latlng
                });
            }
            Map.createInfoWindow(Data.datasetToShow[i]);
            Map.createMarker(latlng, i);
        }
        var heatmapArray = new google.maps.MVCArray(heatmapLonLat);
        Map.heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapArray,
            radius: 50,
            opacity: 0.7,
        });
        if (Map.markersShown) {
            $("#totalMarkers").append("<b>" + Map.markers.length + "</b>");
            Controls.showMarkers();
        }
        if (Map.heatmapShown) {
            Controls.showHeatmap();
        }
        if (Map.clustersShown) {
            Controls.showClusters();
        }
    },
    showHeatmap: function() {
        Map.heatmap.setMap(Map.map);
    },
    showMarkers: function() {
        Map.addMarkers(Map.map);
    },
    showClusters: function() {
        Map.addClusters(Map.map);
    },
    updateMap: function() {
        Data.populateDatasetToShowOnMap(Controls.leftControlsValue, Controls.rightControlsValue);
        Map.reset();
        Controls.showHeatmapAndMarkers();
        Data.drawTable();
        Data.calculateQuantity();
    },
    initialize: function() {
        Data.populateDatasetToShowOnMap(Controls.leftControlsValue, Controls.rightControlsValue);
        Controls.showHeatmapAndMarkers();
        $("#slider").slider().on('slideStop', function(ev) {
            $("#year").find("#yearName").text(" ")
            Controls.leftControlsValue = ev.value[0];
            Controls.rightControlsValue = ev.value[1];
            Controls.updateMap();
        });
        $("#year").find(".dropdown-menu > li > a").click(function(e) {
            var niga = $("#year").find("#yearName").text($(this).text());
            var value = $(yearName).text();
            Controls.leftControlsValue = value;
            Controls.rightControlsValue = value;
            Controls.updateMap();
            $("#slider").slider('setValue', [value, value]);
        });
        Data.drawTable();
        Data.calculateQuantity();
        $("#statistics").find(".dropdown-menu > li > a").click(function(e) {
            Map.heatmapType = $(this).text();
            $("#statistics").find("#statName").text($(this).text());
            Controls.updateMap();
        });
        $("#weight").click(function(e) {
            $("#weight").addClass("active");
            $("#number").removeClass();
        });
        $("#number").click(function(e) {
            $("#number").addClass("active");
            $("#weight").removeClass();
        });
    }
};