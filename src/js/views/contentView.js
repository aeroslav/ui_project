define(function(require){
    var ArticleView = require('views/articleView'),
        ArticlesListView = require('views/articlesListView');

    var ContentView = Backbone.View.extend({
        initialize: function(opt) {
            this.articlesCollection = opt.articlesCollection;
            this.trashBinCids = opt.trashBinCids;
            this.router = opt.router;

            this.articlesListView = new ArticlesListView({
                el: $('.articlesContainer'),
                router: opt.router,
                articlesCollection: opt.articlesCollection,
                trashBinCids: opt.trashBinCids,
            });
            this.articleView = new ArticleView({
                el: $('.singleArticleContainer'),
                router: opt.router,
                articlesCollection: opt.articlesCollection,
                article: {}
            });

            this.listenTo(this.articlesCollection, 'success', function() {
                this.listenTo(this.articlesCollection, 'add remove reset', function() {
                    var routerState = this.router.current();
                    if ( routerState.route === 'section' ) {
                        this.renderCurrentState('section', routerState.params[0]);
                    };
                });
                this.listenTo(this.router, 'stateChange', this.renderCurrentState);
            });
        },

        renderCurrentState: function(state, id) {
            switch (state) {
                case 'article':
                    this.showView(this.articleView);
                    this.articleView.showArticle(this.articlesCollection.get(id));
                    break;
                case 'section':
                    this.showView(this.articlesListView);
                    this.articlesListView.setCurTag(id);
                    break;
                case 'storage':
                    this.showView(this.articlesListView);
                    this.articlesListView.renderTrash();
                    break;
                default:
                    console.warn('unknown state:', state);
                    break;
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