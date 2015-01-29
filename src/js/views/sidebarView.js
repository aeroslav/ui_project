define(function(require){
    var Backbone = require('backbone'),
        SideMenuView = require('views/sideMenuView'),
        tSidebar = require('src/templates/wrapped/tSidebar');

    var tFnSidebar = _.template(tSidebar);
    var SidebarView = Backbone.View.extend({
        initialize: function(opt) {
            this.sideMenuView = new SideMenuView({
                artColl: opt.artColl,
                router: opt.router
            });
            this.render();
        },
        render: function() {
            this.$el.html(tFnSidebar({}));
            this.sideMenuView.setElement(this.$('.menu'));
            this.sideMenuView.render();
        }
    });

    return SidebarView;
});