define(function(require){
    var Backbone = require('backbone'),
        SidebarView = require('views/sidebarView'),
        ArticlesCollection = require('collections/articlesCollection'),
        ArticlesListView = require('views/articlesListView');

    var AppView = Backbone.View.extend({

            initialize: function(opt) {
                this.router = opt.router;
                this.router.appView = this;
                this.articlesCollection = new ArticlesCollection();
                this.articlesCollection.fetchUrl('/json/articles.json');

                this.sidebarView = new SidebarView({
                    el: $('aside'),
                    articlesCollection: this.articlesCollection,
                    router: this.router
                });

                this.articlesListView = new ArticlesListView({
                    el: $('main'),
                    articlesCollection: this.articlesCollection,
                    router: this.router
                });
            }
        });
    console.log('appView ready');
    return AppView;
});