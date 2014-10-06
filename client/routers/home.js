HomeController = RouteController.extend({
    template : 'home',
    waitOn : function(){
        return Meteor.subscribe('temples');
    }
});

TempleDetailController = RouteController.extend({
    template : 'templeDetail',
    waitOn : function(){
        return Meteor.subscribe('templeDetail',this.params._id);
    },
    data : function(){
        var id = this.params._id;
        var temple = Temples.findOne(id);
        Meteor.call('queryWiki',id,'Chùa_Bà_Đá',function(e,r){
            var rs = r.api.query[0].pages[0].page[0].revisions[0].rev[0];
            console.log(r)
        });
        return temple;
    }
})

