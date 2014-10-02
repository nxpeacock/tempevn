Package.describe({
    summary: "A set of plugins for: GPX, KML layers; Bing tile layer; Google and Yandex layers (implemented with their APIs), permalink and distance measurement controls.",
    version: "0.0.1",
    git: "https://github.com/shramov/leaflet-plugins"
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@0.9.3.1');
    //api.addFiles('nxcong:shramow-leaflet-plugins.js');

});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('nxcong:shramow-leaflet-plugins');
    api.addFiles('nxcong:shramow-leaflet-plugins-tests.js');
});
