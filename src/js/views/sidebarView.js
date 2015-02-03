define(function(require){
    var Backbone = require('backbone'),
        SideMenuTagsView = require('views/sideMenuTagsView'),
        SideMenuStorageView = require('views/sideMenuStorageView'),
        tSidebar = require('src/templates/wrapped/tSidebar');

    var SidebarView = Backbone.View.extend({
        initialize: function(opt) {
            this.sideMenuTagsView = new SideMenuTagsView({
                el: this.$('.menu-tags'),
                articlesCollection: opt.articlesCollection,
                router: opt.router
            });
            this.sideMenuStorageView = new SideMenuStorageView({
                el: this.$('.menu-storage'),
                articlesCollection: opt.articlesCollection,
                router: opt.router
            });
        },

        template: _.template(tSidebar),

        render: function() {}
    });

    return SidebarView;
});