var Data = {
    year2007: [],
    year2008: [],
    year2009: [],
    year2010: [],
    year2011: [],
    year2012: [],
    year2013: [],
    year2014: [],
    datasetToShow: [],
    quantity: 0,
    populateDataset: function(data) {
        var year = data["Year"];
        Data["year" + year].push(data);
    },
    populateDatasetToShowOnMap: function(startYear, endYear) {
        Data.datasetToShow = [];
        for (i = startYear; i <= endYear; i++) {
            Data.datasetToShow = Data.datasetToShow.concat(Data["year" + i]);
        }
    },
    calculateQuantity: function() {
        for (i = 0; i < Data.datasetToShow.length; i++) {
            Data.quantity += Number(Data.datasetToShow[i].Quantity);
        };
        $("#totalQuantity").append("<b>" + Math.round(Data.quantity) + "</b>");
    },
    drawTable: function() {
        var list = "";
        for (i = 0; i < Data.datasetToShow.length; i++) {
            list += "<li>" + Data.datasetToShow[i].Item + "</li>";
            list += "<li>" + Data.datasetToShow[i].Item + "</li>";
        };
        $("#mList").append(list);
    },
}