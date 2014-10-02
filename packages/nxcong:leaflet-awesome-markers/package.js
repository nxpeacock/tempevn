Package.describe({
  summary: "forked from bevanhunt/meteor-leaflet-awesome-markers",
  version: "0.0.3",
  git: "forked from bevanhunt/meteor-leaflet-awesome-markers"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.3.1');
  //api.addFiles('nxcong:leaflet-awesome-markers.js');
    api.addFiles('lib/leaflet.awesome-markers.js', 'client');
    api.addFiles('styles/leaflet.awesome-markers.css', 'client');
    api.addFiles('images/markers-matte.png', 'client');
    api.addFiles('images/markers-matte@2x.png', 'client');
    api.addFiles('images/markers-plain.png', 'client');
    api.addFiles('images/markers-shadow.png', 'client');
    api.addFiles('images/markers-shadow@2x.png', 'client');
    api.addFiles('images/markers-soft.png', 'client');
    api.addFiles('images/markers-soft@2x.png', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('nxcong:leaflet-awesome-markers');
  api.addFiles('nxcong:leaflet-awesome-markers-tests.js');
});
