usersLocationStream = new Meteor.Stream('usersLocation');
usersLocationCollection = new Meteor.Collection(null);

Template.home.rendered = function(){
    $(document).ready(function(){
        Meteor.setTimeout(function(){
            L.Icon.Default.imagePath = 'packages/boustanihani_meteor-leaflet/images';
            iMAP = L.map('map', {
                doubleClickZoom: false
            }).setView([21.0247,105.8413], 12);
            iMAP.locate({setView: true, maxZoom: 16});
            var OpenStreetMap_DE = L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
            }).addTo(iMAP);
            var templeMarker = L.AwesomeMarkers.icon({
                icon : 'asterisk',
                markerColor : 'blue'
            });
            L.marker([21.104714, 105.925951],{icon : templeMarker}).addTo(iMAP);
            iMAP.on('locationfound',onLocationFound);
            iMAP.on('locationerror', onLocationError);
        },1000);
    })

}

usersLocationStream.on('locations',function(userLocal){
    //addUserMarker(userLocal);
    if(userLocal){
        if(usersLocationCollection.find({userId : userLocal.userId}).count() === 0){
            usersLocationCollection.insert({
                userId : userLocal.userId,
                color : userLocal.color,
                latlng : userLocal.latlng
            });
        }
        //console.log(usersLocationCollection.find().fetch());
    }
})

var onLocationFound = function(e) {
    var radius = e.accuracy / 2;
    var userLocal = Session.get('userLocal');
    _.extend(userLocal,{'latlng': JSON.stringify(e.latlng)},{'radius' : e.accuracy},{color : randomColor()});
    usersLocationCollection.insert({
        userId : userLocal.userId,
        color : userLocal.color,
        latlng : userLocal.latlng
    });
    addUserMarker(userLocal);

    usersLocationStream.emit('locations',userLocal);
}

var addUserMarker = function(userLocal){
    var userMarker =  L.AwesomeMarkers.icon({
        icon: 'user',
        iconColor : 'green',
        markerColor: 'orange'
    });
    L.marker(JSON.parse(userLocal.latlng),{icon : userMarker}).addTo(iMAP)
        .bindPopup("<span style='color:"+userLocal.color+";font-weight:bold;'>"+userLocal.userId+"</span><br>Đang trong phạm vi " + userLocal.radius + "m từ điểm này.").openPopup();

    L.circle(JSON.parse(userLocal.latlng), userLocal.radius,{color: userLocal.color}).addTo(iMAP);
}

var onLocationError = function(e) {
    alert(e.message);
}