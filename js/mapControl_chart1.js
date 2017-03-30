window.onload = function () {
var dps = []; // dataPoints
        var dps2 =[];

		var chart = new CanvasJS.Chart("chartContainer",{
			title :{
				text: "Distance from Start"
			},
            axisX:{
            valueFormatString: "DD-MMM" ,
            labelAngle: -50,
                title: "Date"
        },
            axisY:{
			    title: "Miles"
            },
			data: [{
				type: "line",
				dataPoints: dps
			}]
		});

		var xVal = 0;
		var yVal = 0;
		var updateInterval = 1;
		var dataLength = 50000; // number of dataPoints visible at any point

		var updateChart = function (count) {
			count = count || 1;
			// count is number of times loop runs to generate random dataPoints.
			yVal = parseFloat($('#dist1').text());

			xVal = $('#dateDisp').text();
			xVal = Date.parse(xVal);
			var z = [];

            // console.log(z);
			if (dps2.indexOf(yVal)==-1){
			    dps2.push(yVal);
			     dps.push({
					x: new Date(xVal),
					y: yVal
				});
            }
            // console.log(dps);
            // console.log(dps);

			// for (var j = 0; j < count; j++) {
			// 	yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
			// 	dps.push({
			// 		x: xVal,
			// 		y: yVal
			// 	});
			// 	xVal++;
			// };
			if (dps.length > dataLength)
			{
				dps.shift();
			}

			chart.render();
         //    console.log(dps);
        //
		};

		// generates first set of dataPoints
		updateChart(dataLength);

		// update chart after specified time.
var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);



var map = L.map('map', {
    zoom: 12,
    fullscreenControl: true,
    center: [39.3, 4]
});

// start of TimeDimension manual instantiation
var timeDimension = new L.TimeDimension({
        period: "PT12H"
    });
// helper to share the timeDimension object between all layers
map.timeDimension = timeDimension; 
// otherwise you have to set the 'timeDimension' option on all layers.

var player        = new L.TimeDimension.Player({
    transitionTime: 25, 
    loop: false,
    startOver:true
}, timeDimension);

var timeDimensionControlOptions = {
    player:        player,
	displayDate: false,
	loopButton: true,
    timeDimension: timeDimension,
    position:      'bottomleft',
    autoPlay:      true,
    minSpeed:      1,
    speedStep:     1,
    maxSpeed:      60,
    timeSliderDragUpdate: true
};
var customControl =  L.Control.extend({

    options: {
        position: 'bottomleft'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div');
        container.id= 'dateDisp'
        container.style.backgroundColor = 'white';
        container.style.position = 'relative';
        container.style.width = '150px'
        container.style.margin = '10 auto';
        //container.style.backgroundImage = "url(http://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
        // container.style.backgroundSize = "30px 30px";
        // container.style.width = '30px';
        // container.style.height = '30px';
        return container;
    }
});
var customControl2 =  L.Control.extend({

    options: {
        position: 'bottomright'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div');
        container.id = 'distancesDisplay';
        container.style.position = 'relative';
        container.style.width = "150px";
        container.style.margin = '10 auto';
        container.innerHTML = '<div id = "dist1" class = "dist">0</div>';
        // console.log(container);
        return container;
    }
});

var timeDimensionControl = new L.Control.TimeDimension(timeDimensionControlOptions);
map.addControl(timeDimensionControl);


var elk_icon = L.icon({
    iconUrl: 'img/elk.png',
    iconSize: [30,30]

});
var deer_icon = L.icon({
    iconUrl: 'img/deer.png',
    iconSize: [38, 38]
});
var customLayer = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:deer_icon});
        }
        return L.circleMarker(latLng, {icon:deer_icon});
    },
    style: {weight:2.5}
});
var customLayer2 = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:deer_icon});
        }
        return L.circleMarker(latLng, {icon:deer_icon});
    },
    style: {weight:2.5}
});
// function parseFeatures(feature){
//     if (feature.properties.hasOwnProperty('last')) {
//         // console.log(feature);
//         // console.log(feature.geometry.coordinates);
//         // console.log("fire");
//         // coord.push(feature.geometry.coordinates[1]);
//         // coord.push(feature.geometry.coordinates[0]);
//         var latlng = L.latLng(feature.geometry.coordinates[1],feature.geometry.coordinates[0]);
//         // console.log(latlng);
//         L.esri.identifyFeatures({
//             url: '//tlamap.trustlands.utah.gov/arcgis/rest/services/UT_SITLA_LandOwnership/MapServer'})
//             .on(map).at(latlng).run(function(error, featureCollection){
//            if (featureCollection.features.length > 0) {
//           console.log(featureCollection.features[0].properties['STATE OF UTAH LEGEND']);
//       }
//       else {
//        // console.log( 'No features identified.');
//       }
//
//   });
//         }
//     // ref.identify()
//     //       .at(feature.properties.lat)
//     //       .run(function(error, featureCollection){
//     //         console.log(featureCollection);
//     //       });
// }
var customLayer3 = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:elk_icon});
        }
        return L.circleMarker(latLng, {icon:elk_icon});

    },
    style: function (feature) {
        switch(feature.properties.name) {
            case "1":
                return {color: '#01a9b2', weight: 2, opacity: 1};
            case "2":
                return {color: '#b1f4fc', weight: 2, opacity: 1};
            case "3":
                return {color: '#EB7618', weight: 2, opacity: 1};
            case "4":
                return {color: '#3bbc89', weight: 2, opacity: 1};
            case "5":
                return {color: '#f099ca', weight: 2, opacity: 1};
             case "6":
                return {color: '#f73e6b', weight: 2, opacity: 1};
            case "7":
                return {color: '#ca8bd1', weight: 2, opacity: 1};
            case "8":
                return {color: '#d6343b', weight: 2, opacity: 1};
            case "9":
                return {color: '#1730c6', weight: 2, opacity: 1};
            case "10":
                return {color: '#d859e0', weight: 2, opacity: 1};
             case "11":
                return {color: '#ca05e3', weight: 2, opacity: 1};
            case "12":
                return {color: '#654b8e', weight: 2, opacity: 1};
            case "13":
                return {color: '#3782c1', weight: 2, opacity: 1};
            case "14":
                return {color: '#b38623', weight: 2, opacity: 1};
        }
    }
});
var customLayer3_full = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:elk_icon});
        }
        return L.circleMarker(latLng, {icon:elk_icon});

    },
    style: function (feature) {
        switch(feature.properties.name) {
            case "1":
                return {color: '#01a9b2', weight: 2, opacity: 1};
            case "2":
                return {color: '#b1f4fc', weight: 2, opacity: 1};
            case "3":
                return {color: '#EB7618', weight: 2, opacity: 1};
            case "4":
                return {color: '#3bbc89', weight: 2, opacity: 1};
            case "5":
                return {color: '#f099ca', weight: 2, opacity: 1};
             case "6":
                return {color: '#f73e6b', weight: 2, opacity: 1};
            case "7":
                return {color: '#ca8bd1', weight: 2, opacity: 1};
            case "8":
                return {color: '#d6343b', weight: 2, opacity: 1};
            case "9":
                return {color: '#1730c6', weight: 2, opacity: 1};
            case "10":
                return {color: '#d859e0', weight: 2, opacity: 1};
             case "11":
                return {color: '#ca05e3', weight: 2, opacity: 1};
            case "12":
                return {color: '#654b8e', weight: 2, opacity: 1};
            case "13":
                return {color: '#3782c1', weight: 2, opacity: 1};
            case "14":
                return {color: '#b38623', weight: 2, opacity: 1};
        }
    }
});
var customLayer4 = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:deer_icon});
        }
        return L.circleMarker(latLng, {icon:deer_icon});
    },
    style: function (feature) {
        switch(feature.properties.name) {
            case "1":
                return {color: '#01a9b2', weight: 2, opacity: 1};
            case "2":
                return {color: '#b1f4fc', weight: 2, opacity: 1};
            case "3":
                return {color: '#EB7618', weight: 2, opacity: 1};
            case "4":
                return {color: '#3bbc89', weight: 2, opacity: 1};
            case "5":
                return {color: '#f099ca', weight: 2, opacity: 1};
             case "6":
                return {color: '#f73e6b', weight: 2, opacity: 1};
            case "7":
                return {color: '#ca8bd1', weight: 2, opacity: 1};
            case "8":
                return {color: '#d6343b', weight: 2, opacity: 1};
            case "9":
                return {color: '#1730c6', weight: 2, opacity: 1};
            case "10":
                return {color: '#d859e0', weight: 2, opacity: 1};
             case "11":
                return {color: '#ca05e3', weight: 2, opacity: 1};
            case "12":
                return {color: '#654b8e', weight: 2, opacity: 1};
            case "13":
                return {color: '#3782c1', weight: 2, opacity: 1};
            case "14":
                return {color: '#b38623', weight: 2, opacity: 1};
             case "15":
                return {color: '#FF4365', weight: 2, opacity: 1};
             case "16":
                return {color: '#00D9C0', weight: 2, opacity: 1};
            case "17":
                return {color: '#561F37', weight: 2, opacity: 1};
            case "18":
                return {color: '#85CB33', weight: 2, opacity: 1};
            case "19":
                return {color: '#FFBA49', weight: 2, opacity: 1};
            case "20":
                return {color: '#55DBCB', weight: 2, opacity: 1};
             case "21":
                return {color: '#446DF6', weight: 2, opacity: 1};
            case "22":
                return {color: '#2FBF71', weight: 2, opacity: 1};
            case "23":
                return {color: '#FFFB46', weight: 2, opacity: 1};
        }
    }
});
var customLayer4_full = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:deer_icon});
        }
        return L.circleMarker(latLng, {icon:deer_icon});
    },
    style: function (feature) {
        switch(feature.properties.name) {
            case "1":
                return {color: '#01a9b2', weight: 2, opacity: 1};
            case "2":
                return {color: '#b1f4fc', weight: 2, opacity: 1};
            case "3":
                return {color: '#EB7618', weight: 2, opacity: 1};
            case "4":
                return {color: '#3bbc89', weight: 2, opacity: 1};
            case "5":
                return {color: '#f099ca', weight: 2, opacity: 1};
             case "6":
                return {color: '#f73e6b', weight: 2, opacity: 1};
            case "7":
                return {color: '#ca8bd1', weight: 2, opacity: 1};
            case "8":
                return {color: '#d6343b', weight: 2, opacity: 1};
            case "9":
                return {color: '#1730c6', weight: 2, opacity: 1};
            case "10":
                return {color: '#d859e0', weight: 2, opacity: 1};
             case "11":
                return {color: '#ca05e3', weight: 2, opacity: 1};
            case "12":
                return {color: '#654b8e', weight: 2, opacity: 1};
            case "13":
                return {color: '#3782c1', weight: 2, opacity: 1};
            case "14":
                return {color: '#b38623', weight: 2, opacity: 1};
             case "15":
                return {color: '#FF4365', weight: 2, opacity: 1};
             case "16":
                return {color: '#00D9C0', weight: 2, opacity: 1};
            case "17":
                return {color: '#561F37', weight: 2, opacity: 1};
            case "18":
                return {color: '#85CB33', weight: 2, opacity: 1};
            case "19":
                return {color: '#FFBA49', weight: 2, opacity: 1};
            case "20":
                return {color: '#55DBCB', weight: 2, opacity: 1};
             case "21":
                return {color: '#446DF6', weight: 2, opacity: 1};
            case "22":
                return {color: '#2FBF71', weight: 2, opacity: 1};
            case "23":
                return {color: '#FFFB46', weight: 2, opacity: 1};
        }
    }
});
var customLayer5 = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:deer_icon});
        }
        return L.circleMarker(latLng, {icon:deer_icon});
    },
    style: {weight:2.5}
});
var customLayer6 = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng);
        }
        return L.circleMarker(latLng);
    },
    style: {weight:2.5}
});
var gpxLayer = omnivore.gpx('data/Deer_34003.gpx', null, customLayer).on('ready', function() {
    map.fitBounds(gpxLayer.getBounds(), {
        paddingBottomRight: [40, 40]
    });
});

var gpxTimeLayer = L.timeDimension.layer.geoJson(gpxLayer, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true
});
var gpxLayer2 = omnivore.gpx('data/deer2.gpx', null, customLayer2);

var gpxTimeLayer2 = L.timeDimension.layer.geoJson(gpxLayer2, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true
});
var gpxLayer3 = omnivore.gpx('data/Elk_WasatchCurrantCreek.gpx', null, customLayer3);
var gpxLayer3_full = omnivore.gpx('data/Elk_WasatchCurrantCreek.gpx', null, customLayer3_full);
var gpxLayer4 = omnivore.gpx('data/deer3.gpx', null, customLayer4);
var group = new L.featureGroup([gpxLayer, gpxLayer2, gpxLayer3, gpxLayer4]);
var gpxLayer4_full = omnivore.gpx('data/deer3.gpx', null, customLayer4).on('ready', function() {
    // map.fitBounds(group.getBounds(), {
    //     paddingBottomRight: [40, 40]
    // });
});
var gpxLayer5 = omnivore.gpx('data/long_migration.gpx', null, customLayer5);
var gpxLayer6 = omnivore.gpx('data/33788_Boring.gpx', null, customLayer6);
// map.fitBounds(group.getBounds());

var gpxTimeLayer3 = L.timeDimension.layer.geoJson(gpxLayer3, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true,
    duration:"P1M15D"
});
var gpxTimeLayer3_full = L.timeDimension.layer.geoJson(gpxLayer3_full, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true
});
var gpxTimeLayer4 = L.timeDimension.layer.geoJson(gpxLayer4, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true,
    duration:"P1M15D"
});
var gpxTimeLayer4_full = L.timeDimension.layer.geoJson(gpxLayer4_full, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true
});
var gpxTimeLayer5 = L.timeDimension.layer.geoJson(gpxLayer5, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true
});
var gpxTimeLayer6 = L.timeDimension.layer.geoJson(gpxLayer6, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true
});
var ref =L.esri.dynamicMapLayer({
    url: '//tlamap.trustlands.utah.gov/arcgis/rest/services/UT_SITLA_LandOwnership/MapServer',
    opacity: "0.4"
  });
ref.bringToBack();
ref.bindPopup(function (error, featureCollection) {
    console.log(featureCollection);
    if(error || featureCollection.features.length === 0) {
      return false;
    } else {
      return featureCollection.features[0].properties['STATE OF UTAH LEGEND'];
    }
  });
function getColor(d) {
    return d == 'Bureau of Land Management' ? '#FEE67A' :
           d == 'National Forest'  ? '#88CE66' :
           d == 'Private'  ? '#FFFFFF' :
           d == 'State Wildlife Reserve/Management Area'  ? '#C2B88E' :
           d == 'State Trust Lands'   ? '#74B3FF' :
           d == 'Other State'   ? '#C2B88E' :
           d == 'Tribal Lands'   ? '#FDB56B' :
           d == 'National Parks, Monuments & Historic Sites' ?  '#CAA6DF' :
           d =='#FFEDA0';
}

 var legend = L.control({position: 'bottomright'});
var legend2 = L.control({position: 'bottomright'});
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["Bureau of Land Management", "National Forest", 'National Parks, Monuments & Historic Sites','State Trust Lands', 'State Wildlife Reserve/Management Area', 'Tribal Lands','Private'];
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML += '<div style="width: 100%;margin-bottom:10px; border-bottom: 1px solid black; text-align: center" > <span style="font-size: 15px; margin: 6px;"><b>Symbols</b> <!--Padding is optional--> </span></div>';
    div.innerHTML +=
            ('<i style="border:none;">'+" <img src="+ "img/deer.png" +" height='25' width='25'>")+"</i>" +' Mule Deer' + '<br>';
    div.innerHTML +=
            ('<i style="border:none;">'+" <img src="+ "img/elk.png" +" height='25' width='25'>")+"</i>" +' Elk' ;
    div.innerHTML += '<div style="width: 100%;margin-bottom:10px; border-bottom: 1px solid black; text-align: center" > <span style="font-size: 15px; margin: 6px;"><b>Land Ownership</b> <!--Padding is optional--> </span></div>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            (grades[i] ? grades[i] + '<br>' : '+');
    }

    return div;
};
legend2.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');

    div.innerHTML += '<div style="width: 100%;margin-bottom:10px; border-bottom: 1px solid black; text-align: center" > <span style="font-size: 15px; margin: 6px;"><b>Symbols</b> <!--Padding is optional--> </span></div>';
    div.innerHTML +=
            ('<i style="border:none;">'+" <img src="+ "img/deer.png" +" height='25' width='25'>")+"</i>" +' Mule Deer' + '<br>';
    div.innerHTML +=
            ('<i style="border:none;">'+" <img src="+ "img/elk.png" +" height='25' width='25'>")+"</i>" +' Elk' ;
    return div;
};
var currentLegend = legend;
currentLegend.addTo(map);
var groupedOverlays = {
  "Elk Group": {
    "Normal": gpxTimeLayer3,
    "Full Path": gpxTimeLayer3_full
  },
  "Deer Group": {
    "Normal": gpxTimeLayer4,
    "Full Path": gpxTimeLayer4_full,
  },
    "Individual Deer":{
        "Deer 1": gpxTimeLayer,
        "Deer 2": gpxTimeLayer2,
        "Long Migration": gpxTimeLayer5,
        "Boring":gpxTimeLayer6
    },
    "Reference Layers": {
    "Land Ownership": ref
}};
var baseLayers = getCommonBaseLayers(map); // see baselayers.js

map.addControl(new customControl());
map.addControl(new customControl2());
L.control.groupedLayers(baseLayers, groupedOverlays).addTo(map);

gpxTimeLayer.addTo(map);
ref.addTo(map);
var legendToggle = L.easyButton({
  states: [{
    stateName: 'legend-on',
    icon: 'fa-list-ul',
    title: 'Toggle Legend Off',
    onClick: function(control) {
      map.removeControl(currentLegend);
      control.state('legend-off');
    }
  }, {
    icon: 'fa-th-list',
    stateName: 'legend-off',
    onClick: function(control) {
      currentLegend.addTo(map);
      control.state('legend-on');
    },
    title: 'Toggle Legend On'
  }]
});
legendToggle.addTo(map);
map.on('overlayadd', function (eventLayer) {
    if (eventLayer.name === 'Deer 1') {
        dps = [];
        dps2 = [];
        map.flyToBounds(gpxLayer.getBounds(), {
        paddingBottomRight: [40, 40]
    })
    }
    else if  (eventLayer.name === 'Deer 2') {
        dps = [];
        dps2 = [];
       map.flyToBounds(gpxLayer2.getBounds(), {
        paddingBottomRight: [40, 40]
    })
    }
    else if  (eventLayer.group.name === 'Deer Group') {
        dps = [];
        dps2 = [];
       map.flyToBounds(gpxLayer4.getBounds(), {
        paddingBottomRight: [40, 40]
    })
    }
    else if  (eventLayer.group.name === 'Elk Group') {
        dps = [];
        dps2 = [];
       map.flyToBounds(gpxLayer3.getBounds(), {
        paddingBottomRight: [40, 40]
    })
    }
});
map.on('overlayadd', function (eventLayer) {
    if (eventLayer.name === 'Land Ownership') {
        map.removeControl(currentLegend );
        currentLegend = legend;
        if (legendToggle._currentState.stateName === 'legend-on') {
            currentLegend.addTo(map);
        }
    }
    });
map.on('overlayremove', function (eventLayer) {
    if (eventLayer.name === 'Land Ownership') {
        map.removeControl(currentLegend );
        currentLegend = legend2;
       if (legendToggle._currentState.stateName === 'legend-on') {
            currentLegend.addTo(map);
        }
    }
    });
L.control.scale({position: "topright"}).addTo(map);




		setInterval(function(){updateChart()}, updateInterval);

	}



