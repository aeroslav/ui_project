define(function(require){
    var Backbone = require('backbone'),
        SideMenuView = require('views/sideMenuView'),
        tSidebar = require('src/templates/wrapped/tSidebar');

    var SidebarView = Backbone.View.extend({
        initialize: function(opt) {
            this.sideMenuView = new SideMenuView({
                articlesCollection: opt.articlesCollection,
                router: opt.router
            });
            this.render();
        },

        template: _.template(tSidebar),

        render: function() {
            this.$el.html(this.template({}));
            this.sideMenuView.setElement(this.$('.menu'));
        }
    });

    return SidebarView;
});