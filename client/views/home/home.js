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
            iMAP.on('locationfound',onLocationFound);
            iMAP.on('locationerror', onLocationError);
        },1000);
    })

}

usersLocationStream.on('usersLocation',function(userLocal){
    if(userLocal){
        usersLocationCollection.insert({
            userId : userLocal.userId,
            color : userLocal.color,
            latlng : userLocal.latlng
        })
    }
})

var onLocationFound = function(e) {
    var radius = e.accuracy / 2;
    var userLocal = Session.get('userLocal');
    L.marker(e.latlng).addTo(iMAP)
        .bindPopup("<span style='color:"+userLocal.color+";font-weight:bold;'>"+userLocal.userId+"</span><br>Bạn đang trong phạm vi " + e.accuracy + "m từ điểm này.").openPopup();
    _.extend(userLocal,{'latlng': JSON.stringify(e.latlng)});
    var color = userLocal.color;
    L.circle(e.latlng, radius,{color: color}).addTo(iMAP);
    usersLocationStream.emit('usersLocation',userLocal);
}

var onLocationError = function(e) {
    alert(e.message);
}