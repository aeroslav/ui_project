define(function(require){
    'use strict';
    var b = require('backbone');

    var Router = Backbone.Router.extend({

        routes: {
            '': 'start',
            'section/:section': 'section',
            'article/:articleId': 'article',
            'storage/:storage': 'storage',
        },

        current : function() { // method to get current route, current history fragment and it params
            var Router = this,
                fragment = Backbone.history.fragment,
                routes = _.pairs(Router.routes),
                route = null, params = null, matched;
            matched = _.find(routes, function(handler) {
                route = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
                return route.test(fragment);
            });
            if (matched) {
                params = Router._extractParameters(route, fragment);
                route = matched[1];
            }
            return {
                route : route,
                fragment : fragment,
                params : params
            };
        }
    });

    return Router;
});