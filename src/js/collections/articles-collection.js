define(function(require){
    var ArticleModel = require('models/article-model');

    var ArticlesCollection = Backbone.Collection.extend({

            model: ArticleModel,

            initialize: function() {
                this.on('change', function() {
                    console.log('ArticlesCollection change');
                })
            },

            fetchUrl: function(url) {
                this.url = url;
                this.fetch({
                    success: function(coll, res) {
                        coll.trigger('success');
                    },
                    error: function(coll, res) {
                        console.log('error fetching', coll.articlesCollection.url, '\nresponse:\n', res, '\n------------');
                    },
                    reset: true
                });
            }
        });

    return ArticlesCollection;
});