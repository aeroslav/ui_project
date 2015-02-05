define(function(require){
    var tArticlesList = require('src/templates/wrapped/tArticlesList');

    var ArticlesListView = Backbone.View.extend({

        initialize: function(opt) {
            this.router = opt.router;
            this.articlesCollection = opt.articlesCollection;
            this.trashBinIds = opt.trashBinIds,

            this.curTag = 'all';
            this.curArticlesIds = [];

            this.listenTo(this.articlesCollection, 'success', this.updateArticlesList);
        },

        template: _.template(tArticlesList, {variable: 'data'}),

        render: function() {
            var articlesToRender = _.filter(this.articlesCollection.models, function(model) {
                return _.contains(this.curArticlesIds, model.id);
            }, this);
            this.$el.html(this.template({
                articles: articlesToRender,
                isTrash: false
            }));
        },

        renderTrash: function() {
            var articlesToRender = _.filter(this.articlesCollection.models, function(model) {
                return _.contains(this.trashBinIds, model.id);
            }, this);
            this.$el.html(this.template({
                articles: articlesToRender,
                isTrash: true
            }));
        },

        events: {
            'click .articleCard-Btn--trash': 'removeToTrash'
        },

        setCurTag: function(tag) {
            this.curTag = tag;
            this.updateArticlesList();
        },

        updateArticlesList: function(tag) {
            this.curArticlesIds = [];
            if (tag) {
                this.curTag = tag.toLowerCase();
            } else {
                tag = this.curTag;
            };

            _.each(this.articlesCollection.models, function(article) {
                var tags = _.map(article.attributes.tags, function(el) {
                    return el.toLowerCase();
                });

                if (tag !== 'all') {
                    if (_.contains(tags, tag) && !(_.contains(this.trashBinIds, article.id)) ) {
                        this.curArticlesIds.push(article.id);
                    }
                } else {
                    if ( !( _.contains(this.trashBinIds, article.id) )) {
                        this.curArticlesIds.push(article.id);
                    }
                }
            }, this);

            this.render();
        },

        removeToTrash: function(e) {
            var removedId = $(e.target).parent().parent().data('id').toString();
            if ( !(_.contains(this.trashBinIds, removedId)) ) {
                this.trashBinIds.push(removedId);
                this.curArticlesIds = _.without(this.curArticlesIds, removedId);
                this.articlesCollection.trigger('movedTrash');
                this.render();
            } else {
                this.curArticlesIds.push(removedId);
                this.trashBinIds.splice(this.trashBinIds.indexOf(removedId), 1);
                this.articlesCollection.trigger('movedTrash');
                this.renderTrash();
            };
        }
    });

    return ArticlesListView;
});