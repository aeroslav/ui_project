define(function(require){
    var ArticleView = require('views/article-view'),
        ArticlesListView = require('views/articlesList-view');

    var ContentView = Backbone.View.extend({
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

            this.listenTo(this.articlesCollection, 'success add remove reset', this.articleCollEventHandler);
        },

        articleCollEventHandler: function() {
            var routerState = this.router.current();
            if ( routerState.route === 'section' ) {
                this.renderCurrentState('section', routerState.params[0]);
            };
        },

        showView: function(view) {
            this.articlesListView.$el.removeClass('is-visible');
            this.articleView.$el.removeClass('is-visible');
            view.$el.addClass('is-visible');
        }
    });

    return ContentView;
});