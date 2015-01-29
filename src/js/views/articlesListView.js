define(function(require){
    var Backbone = require('backbone'),
        ArticlesCollection = require('collections/articlesCollection'),
        tArticlesList = require('src/templates/wrapped/tArticlesList');

    var tFnArticlesList = _.template(tArticlesList, {variable: 'data'}),
        curArticlesCollection =new ArticlesCollection();

    var ArticlesListView = Backbone.View.extend({
        initialize: function(opt) {
            this.artColl = opt.artColl;
            this.listenTo(this.artColl, 'cUpdate', this.updateArticleList);
        },
        render: function() {
            this.$el.html(tFnArticlesList({ articles: curArticlesCollection.models }));
        },
        updateArticleList: function(tag) {
            _.each(this.artColl.models, function(article) {
                var tags = article.attributes.tags;
                if (tag) {
                    if (_.contains(tags, tag)) {
                        curArticlesCollection.push(article);
                    }
                } else {
                    curArticlesCollection.push(article);
                }
            });
            this.render();
        }
    });

    return ArticlesListView;
});