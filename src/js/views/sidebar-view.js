define(function(require){
    var Backbone = require('backbone'),
        SideMenuView = require('views/sidemenu-view');
        //sidebarTemplate = require('src/templates/wrapped/sidebar-tpl');

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
        }

    });

    return SidebarView;
});