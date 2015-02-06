define(function(require){
    var articlesListTpl = require('src/templates/wrapped/articles-list-tpl');

    var ArticlesListView = Backbone.View.extend({

        initialize: function(opt) {
            this.router = opt.router;
            this.articlesCollection = opt.articlesCollection;
            this.trashBinIds = opt.trashBinIds,

            this.curTag = 'all';
            this.curArticlesIds = [];

            this.listenTo(this.articlesCollection, 'success', this.updateArticlesList);
        },

        template: _.template(articlesListTpl, {variable: 'data'}),

        renderTrash: function() {
            var articlesToRender = this.articlesCollection.filter(function(model) {
                return _.contains(this.trashBinIds, model.id);
            }, this);
            this.$el.html(this.template({
                articles: articlesToRender,
                isTrash: true
            }));
        },

        events: {
            'click .article-card-Btn-trash': 'removeToTrash'
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

            this.articlesCollection.each(function(article) {
                var tags = _.map(article.attributes.tags, function(el) {
                    return el.toLowerCase();
                });

                var isTagFits = _.contains(tags, tag),
                    isNotInTrashAlready = !(_.contains(this.trashBinIds, article.id)),
                    isArticleIdPushTo = (tag !== 'all') ? (isTagFits && isNotInTrashAlready) : (isNotInTrashAlready);

                if (isArticleIdPushTo) {
                    this.curArticlesIds.push(article.id);
                }

            }, this);

            this.render();
        },

        removeToTrash: function(e) {
            var removedId = $(e.target).closest('.article-card').data('id').toString(),
                removeAnimComplete = (function(isListToRender) {
                    return (function() {
                        this.articlesCollection.trigger('movedTrash');
                        if (isListToRender) {
                            this.render();
                        } else {
                            this.renderTrash();
                        };
                    }).bind(this);
                }).bind(this),
                hideArticle = function(e, isListToRender) {
                    var articleCard = $(e.target).closest('.article-card');
                    articleCard.animate({
                        'margin-top': 0,
                        'margin-bottom': 0,
                        'height': 0,
                        'opacity': 0
                    },{
                        duration: 200,
                        easing: 'swing',
                        complete: removeAnimComplete(isListToRender)
                    });
                };

            if ( !(_.contains(this.trashBinIds, removedId)) ) {
                this.trashBinIds.push(removedId);
                this.curArticlesIds = _.without(this.curArticlesIds, removedId);
                this.articlesCollection.trigger('movedTrash');
                hideArticle(e, true);
            } else {
                this.curArticlesIds.push(removedId);
                this.trashBinIds.splice(this.trashBinIds.indexOf(removedId), 1);
                this.articlesCollection.trigger('movedTrash');
                hideArticle(e, false);
            };
        },

        render: function() {
            var articlesToRender = this.articlesCollection.filter(function(model) {
                return _.contains(this.curArticlesIds, model.id);
            }, this);
            this.$el.html(this.template({
                articles: articlesToRender,
                isTrash: false
            }));
        }
    });

    return ArticlesListView;
});