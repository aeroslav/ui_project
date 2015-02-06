define(function(require){
    var ArticleView = require('views/article-view'),
        ArticlesListView = require('views/articlesList-view');

    var ContentView = Backbone.View.extend({ // accepting and then passing router, collection of articles and array of trash id to children
        initialize: function(opt) {
            this.articlesCollection = opt.articlesCollection;
            this.trashBinIds = opt.trashBinIds;
            this.router = opt.router;

            this.articlesListView = new ArticlesListView({
                el: $('.articles-container'),
                router: opt.router,
                articlesCollection: opt.articlesCollection,
                trashBinIds: opt.trashBinIds,
            });
            this.articleView = new ArticleView({
                el: $('.single-article-container'),
                router: opt.router,
                articlesCollection: opt.articlesCollection,
                trashBinIds: opt.trashBinIds,
                article: {}
            });
        },

        showView: function(view) { // hiding all content views and then showing one
            this.articlesListView.$el.removeClass('is-visible');
            this.articleView.$el.removeClass('is-visible');
            view.$el.addClass('is-visible');
        }
    });

    return ContentView;
});