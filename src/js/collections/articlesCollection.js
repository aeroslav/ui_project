define(function(require){
    var Backbone = require('backbone'),
        ArticleModel = require('models/articleModel');

    var ArticlesCollection = Backbone.Collection.extend({
            model: ArticleModel,
            fetchUrl: function(url) {
                this.url = url;
                this.fetch({
                    success: function(coll, res) {
                        coll.trigger('success')
                    },
                    error: function(coll, res) {
                        console.log('error fetching ArticlesCollection', res);
                    },
                    reset: true
                });
            }
        });

    return ArticlesCollection;
});