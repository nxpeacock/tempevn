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
    this.route('admin_temple',{
        controller : this.AdminTempleController,
        path :'/quan-tri/chua-phat-giao'
    })
});