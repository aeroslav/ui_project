define(function(require){
    'use strict';
    var b = require('backbone');

    var Router = Backbone.Router.extend({
        routes: {
            '': 'start',
            'section=:section': 'section'
        },
        start: function () {
            console.log('router fire start');
        },
        section: function(section) {
            console.log(section);
        }
    });

    return Router;
});