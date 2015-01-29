define(function(require){
    'use strict';
    var b = require('backbone');

    var Router = Backbone.Router.extend({
        routes: {
            '': 'start',
            'section=:section': 'section'
        },
        start: function () {
            console.log('route #start activated');
        },
        section: function(section) {
            
        }
    });

    return Router;
});