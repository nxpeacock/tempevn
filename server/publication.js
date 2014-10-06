Meteor.publish('temples',function(){
    return Temples.find();
});

Meteor.publish('templeDetail',function(templeId){
    return Temples.find({_id : templeId});
})