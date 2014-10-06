usersLocationStream = new Meteor.Stream('usersLocation');
usersLocationCollection = new Meteor.Collection(null);

Template.home.created = function(){
    L.Icon.Default.imagePath = 'packages/boustanihani_meteor-leaflet/images';

}

Template.home.rendered = function () {
    $(document).ready(function () {
        setTimeout(function () {
            $(window).resize(function() {
                $('#map').css('height', window.innerHeight - 60 - 58);
            });
            $(window).resize();
            iMAP = L.map('map', {
                doubleClickZoom: false
            }).setView([21.0247, 105.8413], 12);
            iMAP.locate({setView: true, maxZoom: 16});
            OpenStreetMap_DE = L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
            }).addTo(iMAP);
            var templeMarker = L.AwesomeMarkers.icon({
                icon: 'asterisk',
                markerColor: 'green'
            });

            var temples = Temples.find().fetch();
            _.each(temples,function(t){
                var popUpContent = Blaze.toHTMLWithData(Template.templeSummary,t);
                L.marker([t.lat, t.long], {icon: templeMarker}).addTo(iMAP)
                    .bindPopup(popUpContent);
            })
            //var ggl = new L.Google();
            //var ggl2 = new L.Google('TERRAIN');
            //var bing = new L.BingLayer("ArXrKUpYgqfhkBDY9Fdm6cONGlQVbYqgvR882HR4OjfVqPorE2j3TnCzoExJP61K");
            //iMAP.addLayer(ggl2);
            //iMAP.addLayer(bing);

            //iMAP.addControl(new L.Control.Layers({'OSM': OpenStreetMap_DE, 'Google Terrain': ggl2}, {}));

/*            L.marker([21.104714, 105.925951], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.024578, 105.802768], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.035708, 105.8331215], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.049374, 105.838712], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.036692, 105.794971], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.024731, 105.845097], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.058857, 105.986491], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.042775, 105.820552], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.029258, 105.850385], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.089615, 105.804301], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.029171, 105.836646], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.029080, 105.837499], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');
            L.marker([21.011513, 105.905882], {icon: templeMarker}).addTo(iMAP).bindPopup('Chùa Việt Nam');*/
            iMAP.on('locationfound', onLocationFound);
            iMAP.on('locationerror', onLocationError);
        }, 500);
    })

}

usersLocationStream.on('locations', function (userLocal) {
    //addUserMarker(userLocal);
    if (userLocal) {
        if (usersLocationCollection.find({userId: userLocal.userId}).count() === 0) {
            usersLocationCollection.insert({
                userId: userLocal.userId,
                color: userLocal.color,
                latlng: userLocal.latlng
            });
        }
        //console.log(usersLocationCollection.find().fetch());
    }
})

var onLocationFound = function (e) {
    var radius = e.accuracy / 2;
    var userLocal = Session.get('userLocal');
    _.extend(userLocal, {'latlng': JSON.stringify(e.latlng)}, {'radius': e.accuracy}, {color: randomColor()});
    usersLocationCollection.insert({
        userId: userLocal.userId,
        color: userLocal.color,
        latlng: userLocal.latlng
    });
    addUserMarker(userLocal);

    usersLocationStream.emit('locations', userLocal);
}

var addUserMarker = function (userLocal) {
    var userMarker = L.AwesomeMarkers.icon({
        icon: 'user',
        iconColor: 'green',
        markerColor: 'orange'
    });
    L.marker(JSON.parse(userLocal.latlng), {icon: userMarker}).addTo(iMAP)
        .bindPopup("<span style='color:" + userLocal.color + ";font-weight:bold;'>" + userLocal.userId + "</span><br>Đang trong phạm vi " + userLocal.radius + "m từ điểm này.").openPopup();

    L.circle(JSON.parse(userLocal.latlng), userLocal.radius, {color: userLocal.color}).addTo(iMAP);
}

var onLocationError = function (e) {
    alert(e.message);
}