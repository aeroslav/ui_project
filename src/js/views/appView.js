define(function(require){
    var Backbone = require('backbone'),
        SidebarView = require('views/sidebarView'),
        ArticlesCollection = require('collections/articlesCollection'),
        ArticleView = require('views/articleView'),
        ArticlesListView = require('views/articlesListView');

    var AppView = Backbone.View.extend({

            initialize: function(opt) {
                this.router = opt.router;

                this.articlesCollection = new ArticlesCollection();
                this.articlesCollection.fetchUrl('/json/articles.json');

                this.initializeNested();

                this.router.on('stateChange', this.routerStateChangeHandler, this);
            },

            routerStateChangeHandler: function(state, id) {
                switch (state) {
                    case 'section':
                        this.showView(this.articlesListView);
                        this.sidebarView.sideMenuTagsView.selectTag(id);
                        this.articlesListView.setCurTag(id);
                        break;
                    case 'article':
                        this.showView(this.articleView);
                        this.articleView.showArticle(this.articlesCollection.get(id));
                        break;
                    case 'storage':
                        console.log('storage');
                        this.showView(this.articlesListView);
                        this.articlesListView.updateArticlesList(false, id);
                        //this.sidebarView.sideMenuStorageView.updateArticlesStorage(id);
                        break;
                    default:
                        console.log('default');
                        break;
                };
            },

            initializeNested: function() {
                this.sidebarView = new SidebarView({
                    el: $('aside'),
                    articlesCollection: this.articlesCollection,
                    router: this.router
                });

                this.articlesListView = new ArticlesListView({
                    el: $('.articlesList'),
                    articlesCollection: this.articlesCollection
                });

                this.articleView = new ArticleView({
                    el: $('.singleArticleContainer'),
                    article: {},
                    router: this.router
                });
            },

            showView: function(view) {
                this.articlesListView.$el.removeClass('is-visible');
                this.articleView.$el.removeClass('is-visible');
                view.$el.addClass('is-visible');
            },
        });

    return AppView;
});