define(function(require){
    var Backbone = require('backbone'),
        ArticlesCollection = require('collections/articlesCollection'),
        tArticlesList = require('src/templates/wrapped/tArticlesList');

    var ArticlesListView = Backbone.View.extend({

        initialize: function(opt) {
            this.curTag = 'all';
            this.articlesCollection = opt.articlesCollection;
            this.curArticlesCollection = new ArticlesCollection();
            this.listenTo(this.articlesCollection, 'success', this.updateArticlesList);
        },

        template: _.template(tArticlesList, {variable: 'data'}),

        render: function() {
            this.$el.html(this.template({ articles: this.curArticlesCollection.models }));
        },

        updateArticlesList: function(tag) {
            console.log('updating articles list by tag =', tag, ' curTag =', this.curTag);

            this.curArticlesCollection.reset();
            if (tag) this.curTag = tag
            else tag = this.curTag;
            _.each(this.articlesCollection.models, function(article) {
                var tags = _.map(article.attributes.tags, function(el) {
                    return el.toLowerCase();
                });
                if (tag && (tag !== 'all') ) {
                    if (_.contains(tags, tag)) {
                        this.curArticlesCollection.push(article);
                    }
                } else {
                    this.curArticlesCollection.push(article);
                }
            }, this);
            this.render();
        },

        expand: function() {
            this.$el.addClass('is-visible');
        },

        collapse: function() {
            this.$el.removeClass('is-visible');
        }
    });

    return ArticlesListView;
});