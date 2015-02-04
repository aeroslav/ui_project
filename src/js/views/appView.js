define(function(require){
    var SidebarView = require('views/sidebarView'),
        ContentView = require('views/contentView');

    var AppView = Backbone.View.extend({

            initialize: function(opt) {
                console.log('---AppView init');
                this.router = opt.router;
                this.articlesCollection = opt.articlesCollection;
                this.trashBinCids = opt.trashBinCids;

                this.sidebarView = new SidebarView({
                    el: this.$('aside'),
                    articlesCollection: this.articlesCollection,
                    trashBinCids: opt.trashBinCids,
                    router: this.router
                });
                this.contentView = new ContentView({
                    el: this.$('main'),
                    articlesCollection: this.articlesCollection,
                    trashBinCids: opt.trashBinCids,
                    router: this.router
                });
                console.log('---AppView init end');
            },

        });

    return AppView;
});