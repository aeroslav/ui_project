define(function(require){
    var Backbone = require('backbone'),
        SideMenuView = require('views/sidemenu-view'),
        tSidebar = require('src/templates/wrapped/tSidebar');

    var SidebarView = Backbone.View.extend({
        initialize: function(opt) {
            this.articlesCollection = opt.articlesCollection;
            this.router = opt.router;

            this.sideMenuView = new SideMenuView({
                el: this.$('.menu'),
                articlesCollection: opt.articlesCollection,
                trashBinIds: opt.trashBinIds,
                router: opt.router
            });
        },

        template: _.template(tSidebar)

    });

    return SidebarView;
});