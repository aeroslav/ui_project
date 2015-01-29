define(function(require){
    var Backbone = require('backbone'),
        SidebarView = require('views/sidebarView'),
        ArticlesListView = require('views/articlesListView');

    var AppView = Backbone.View.extend({
            initialize: function(opt) {
                var sidebarView = new SidebarView({
                        el: $('aside'),
                        artColl: opt.artColl,
                        router: opt.router
                    }),
                    articlesListView = new ArticlesListView({
                        el: $('main'),
                        artColl: opt.artColl,
                        router: opt.router
                    });
            }
        });

    return AppView;
});