//// Constrained map in the work area
var view = new ol.View({
    center: ol.proj.fromLonLat([-84.1027104, 9.865107]),
    zoom: 12
    // [minx,miny,max,may]
    //extent: extent_area,
});

// Map need a layers group
// adding only base layer
var map = new ol.Map({
    controls: ol.control.defaults(
        {attribution: false}),
    layers: [
	      new ol.layer.Tile({
	          source: new ol.source.OSM(),
	      }),
	      //vectorLayer,
    ],
    keyboardEventTarget: document,
    //overlays: [overlay_node_info],
    target: 'map-view',
    view: view,
});

map.on('click', (event)=> {
    console.log("Click on map");

    var coordinate = ol.proj.toLonLat(event.coordinate);
    console.log("Coordinate on click: " + String(coordinate));

    var feature_onHover = map.forEachFeatureAtPixel(
        event.pixel,
        function(feature, layer)
        {
            return feature;
        });

    if ( feature_onHover ){
        console.log("click was on feature");
    }

});
