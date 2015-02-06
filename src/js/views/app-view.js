define(function(require){
    var SidebarView = require('views/sidebar-view'),
        ContentView = require('views/content-view');

    var AppView = Backbone.View.extend({

            initialize: function(opt) { // accepting and then passing router, collection of articles and array of trash id to children
                this.router = opt.router;
                this.articlesCollection = opt.articlesCollection;
                this.trashBinIds = opt.trashBinIds;

                this.sidebarView = new SidebarView({ // init-ing sidebarView
                    el: this.$('aside'),
                    articlesCollection: this.articlesCollection,
                    trashBinIds: opt.trashBinIds,
                    router: this.router
                });
                this.contentView = new ContentView({ // init-ing contentView
                    el: this.$('main'),
                    articlesCollection: this.articlesCollection,
                    trashBinIds: opt.trashBinIds,
                    router: this.router
                });

                this.listenTo(this.router, 'route', this.routeHandler);
            },

            routeHandler: function(state, params) {
                switch (state) {
                    case 'article':
                        this.contentView.showView(this.contentView.articleView); // showing single article view
                        this.contentView.articleView.showArticle(this.articlesCollection.get(params[0])); // rendering selected article into view
                        break;
                    case 'section':
                        if (params[0]) {
                            this.contentView.articleView.prevRoute = 'section/' + params[0]; // memorizing route in articleView
                            this.contentView.showView(this.contentView.articlesListView);
                            this.contentView.articlesListView.setCurTag(params[0]); // render list of materials, selected by tag
                            this.sidebarView.sideMenuView.selectTag(params[0]); // highlighting corresponding tag in sidebar
                        } else {
                            this.router.navigate('section/all', {trigger: true}); // if no param for 'section' route, redirecting to 'all' section
                        };
                        break;
                    case 'storage':
                        var storageClass = '.menu-link-' + params[0];
                        this.contentView.articleView.prevRoute = 'storage/' + params[0];
                        this.contentView.showView(this.contentView.articlesListView); // show list of articles from trash
                        if (params[0] === 'trash') {
                            this.contentView.articlesListView.renderTrash();
                        } else {
                            this.router.navigate('storage/trash', {trigger: true});
                        };
                        this.sidebarView.sideMenuView.selectStorage(storageClass);
                        break;
                    default:
                        this.router.navigate('section/all', {trigger: true}); // redirect to default route
                        break;
                };
            }

        });

    return AppView;
});