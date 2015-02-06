define(function(require){
    var SidebarView = require('views/sidebar-view'),
        ContentView = require('views/content-view');

    var AppView = Backbone.View.extend({

            initialize: function(opt) {
                this.router = opt.router;
                this.articlesCollection = opt.articlesCollection;
                this.trashBinIds = opt.trashBinIds;

                this.sidebarView = new SidebarView({
                    el: this.$('aside'),
                    articlesCollection: this.articlesCollection,
                    trashBinIds: opt.trashBinIds,
                    router: this.router
                });
                this.contentView = new ContentView({
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
                        this.contentView.showView(this.contentView.articleView);
                        this.contentView.articleView.showArticle(this.articlesCollection.get(params[0]));
                        break;
                    case 'section':
                        if (params[0]) {
                            this.contentView.articleView.prevRoute = 'section/' + params[0];
                            this.contentView.showView(this.contentView.articlesListView);
                            this.contentView.articlesListView.setCurTag(params[0]);
                            this.sidebarView.sideMenuView.selectTag(params[0]);
                        } else {
                            this.router.navigate('section/all', {trigger: true});
                        };
                        break;
                    case 'storage':
                    var storageClass = '.menu-link-' + params[0];
                        this.contentView.articleView.prevRoute = 'storage/' + params[0];
                        this.contentView.showView(this.contentView.articlesListView);
                        if (params[0] === 'trash') {
                            this.contentView.articlesListView.renderTrash();
                        } else {
                            this.router.navigate('storage/trash', {trigger: true});
                        };
                        this.sidebarView.sideMenuView.selectStorage(storageClass);
                        break;
                    default:
                        console.log('redirect to default route');
                        this.router.navigate('section/all', {trigger: true});
                        break;
                };
            }

        });

    return AppView;
});