define(function(require){
    var Backbone = require('backbone'),
        SideMenuView = require('views/sideMenuView'),
        tSidebar = require('src/templates/wrapped/tSidebar');

    var SidebarView = Backbone.View.extend({
        initialize: function(opt) {
            this.articlesCollection = opt.articlesCollection;
            this.router = opt.router;

            this.sideMenuView = new SideMenuView({
                el: this.$('.menu'),
                articlesCollection: opt.articlesCollection,
                trashBinCids: opt.trashBinCids,
                router: opt.router
            });

            this.listenTo(this.router, 'stateChange', this.renderCurrentState);
        },

        template: _.template(tSidebar),

        renderCurrentState: function(state, id) {
            switch (state) {
                case 'article':
                    //this.sideMenuView.selectTag(id);
                    break;
                case 'section':
                    this.sideMenuView.selectTag(id);
                    break;
                case 'storage':
                    this.sideMenuView.selectStorage('.menu-link--trash');
                    break;
                default:
                    console.warn('unknown state:', state);
                    break;
            };
        }

    });

    return SidebarView;
});