const {streetElementGroup} = require('streetelement');
import {fromLonLat, toLonLat} from 'ol/proj';

//////////////////////////////////////////////////
//       +++++++++
//       +       +
//       +  Map  +
//       +       +
// --->  @++++++++
var extent_area =
    fromLonLat([-84.43669241118701,9.726525930153954]

              );

// ++++++++@ <---
// +       +
// +  Map  +
// +       +
// +++++++++
extent_area = extent_area.concat(
    fromLonLat([-83.72894500499169,9.99625455768836]

              ));

var o_se_group = new streetElementGroup([-84.1027104, 9.865107], extent_area);

o_se_group.map.on('click', (event)=> {
    console.log("Click on map");

    var coordinate = toLonLat(event.coordinate);
    console.log("Coordinate on click: " + String(coordinate));

    var feature_onHover = o_se_group.map.forEachFeatureAtPixel(
        event.pixel,
        function(feature, layer)
        {
            return feature;
        });

    if ( feature_onHover ){
        console.log("click was on feature");
    }

});

o_se_group.map.setTarget('map-view');

module.exports = { // FIXME temporal test
    o_se_group
}
