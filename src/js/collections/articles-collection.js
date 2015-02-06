define(function(require){
    var ArticleModel = require('models/article-model');

    var ArticlesCollection = Backbone.Collection.extend({ 

            model: ArticleModel,

            fetchUrl: function(url) { // method to fetch json from url to collection
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