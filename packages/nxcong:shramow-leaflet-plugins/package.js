Package.describe({
    summary: "A set of plugins for: GPX, KML layers; Bing tile layer; Google and Yandex layers (implemented with their APIs), permalink and distance measurement controls.",
    version: "0.0.2",
    git: "https://github.com/shramov/leaflet-plugins"
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@0.9.3.1');
    //api.addFiles('nxcong:shramow-leaflet-plugins.js');
    api.addFiles('control/Distance.js','client');
    api.addFiles('control/Layers.Load.js','client');
    api.addFiles('control/Permalink.js','client');
    api.addFiles('control/Permalink.Line.js','client');
    api.addFiles('control/Permalink.Marker.js','client');
    api.addFiles('css/cross.png','client');
    api.addFiles('css/measure.png','client');
    api.addFiles('css/distance.css','client');
    api.addFiles('layer/tile/Bing.js','client');
    api.addFiles('layer/tile/Google.js','client');
    api.addFiles('layer/tile/Yandex.js','client');
    api.addFiles('layer/vector/GPX.js','client');
    api.addFiles('layer/vector/GPX.Speed.js','client');
    api.addFiles('layer/vector/KML.js','client');
    api.addFiles('layer/vector/OSM.js','client');
    api.addFiles('layer/Icon.Canvas.js','client');
    api.addFiles('layer/Layer.Deferred.js','client');
    api.addFiles('layer/Marker.Rotate.js','client');
    api.addFiles('layer/Marker.Text.js','client');
    api.addFiles('layer/OpenStreetBugs.js','client');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('nxcong:shramow-leaflet-plugins');
    api.addFiles('nxcong:shramow-leaflet-plugins-tests.js');
});
