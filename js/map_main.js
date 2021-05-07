import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Tile from 'ol/layer/Tile';

import {fromLonLat, toLonLat} from 'ol/proj';
import {defaults} from 'ol/control';


//// Constrained map in the work area
var view = new View({
    center: fromLonLat([-84.1027104, 9.865107]),
    zoom: 12
    // [minx,miny,max,may]
    //extent: extent_area,
});

// Map need a layers group
// adding only base layer
var map = new Map({
    controls: defaults(
        {attribution: false}),
    layers: [
	      new Tile({
	          source: new OSM(),
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

    var coordinate = toLonLat(event.coordinate);
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
