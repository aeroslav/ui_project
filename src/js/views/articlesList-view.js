define(function(require){
    var articlesListTpl = require('src/templates/wrapped/articles-list-tpl');

    var ArticlesListView = Backbone.View.extend({

        initialize: function(opt) { // accepting router, collection of articles and array of trash id from parent
            this.router = opt.router;
            this.articlesCollection = opt.articlesCollection;
            this.trashBinIds = opt.trashBinIds,

            this.curTag = 'all'; // current tag to select articles from collection
            this.curArticlesIds = []; // array of ids of articles to render

            this.listenTo(this.articlesCollection, 'success', this.updateArticlesList);
        },

        template: _.template(articlesListTpl, {variable: 'data'}),

        events: {
            'click .article-card-Btn-trash': 'moveToAndFromTrash'
        },

        setCurTag: function(tag) { // set new tag and update list of articles
            this.curTag = tag;
            this.updateArticlesList();
        },

        updateArticlesList: function(tag) { // form new list of articles ids by tag and render it
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

        moveToAndFromTrash: function(e) { // remove item from list to trash, or getting it back
            var removedId = $(e.target).closest('.article-card').data('id').toString(),
                removeAnimComplete = (function(isListToRender) { // fn which executes after completing closing animation; binded to context
                    return (function() {
                        this.articlesCollection.trigger('movedTrash');
                        if (isListToRender) { // decide render list of articles or list of trash
                            this.render();
                        } else {
                            this.renderTrash();
                        };
                    }).bind(this);
                }).bind(this),
                hideArticle = function(e, isListToRender) { // fire animation of hiding article
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
        },

        renderTrash: function() {
            var articlesToRender = this.articlesCollection.filter(function(model) {
                return _.contains(this.trashBinIds, model.id);
            }, this);
            this.$el.html(this.template({
                articles: articlesToRender,
                isTrash: true
            }));
        }
    });

    return ArticlesListView;
});