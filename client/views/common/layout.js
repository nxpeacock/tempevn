Template.mapLayout.rendered = function(){
    $(document).ready(function(){
        Meteor.setTimeout(function(){
            $(window).resize(function() {
                $('#map').css('height', window.innerHeight - 60 - 58);
            });
            $(window).resize(); // trigger resize event
        },200)
    })
}