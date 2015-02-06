define(function(require){
    var Backbone = require('backbone'),
        SideMenuView = require('views/sidemenu-view');

    var SidebarView = Backbone.View.extend({
        initialize: function(opt) { // accepting and then passing router, collection of articles and array of trash id to children
            this.articlesCollection = opt.articlesCollection;
            this.router = opt.router;

            this.sideMenuView = new SideMenuView({
                el: this.$('.menu'),
                articlesCollection: opt.articlesCollection,
                trashBinIds: opt.trashBinIds,
                router: opt.router
            });
        }

    });

    return SidebarView;
});