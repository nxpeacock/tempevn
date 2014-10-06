this.Router.configure({
    layoutTemplate: 'mapLayout',
    notFoundTemplate: '404',
    yieldTemplates: {
        'topmenu': {
            to: 'topmenu'
        }
    }
});

this.Router.map(function() {
    this.route('home', {
        controller: this.HomeController,
        path: '/'
    });
    this.route('templeDetail',{
        controller : this.TempleDetailController,
        path : '/chua-phat-giao/:_id'
    });
    this.route('admin_temple',{
        controller : this.AdminTempleController,
        path :'/quan-tri/chua-phat-giao'
    })
});