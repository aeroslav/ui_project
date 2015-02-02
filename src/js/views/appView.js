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
                        console.log('show list');
                        this.switchToListView();
                        this.sidebarView.sideMenuView.selectTag(id);
                        this.articlesListView.curTag = id;
                        this.articlesListView.updateArticlesList(id);
                        break;
                    case 'article':
                        console.log('show article');
                        this.switchToSingleView();
                        this.articleView.showArticle(this.articlesCollection.get(id));
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

            switchToSingleView: function() {
                this.articlesListView.collapse();
                this.articleView.expand();
            },

            switchToListView: function() {
                this.articleView.collapse();
                this.articlesListView.expand();
            }
        });

    return AppView;
});