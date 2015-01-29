define(function(require){
    var Backbone = require('backbone'),
        ArticleModel = require('models/articleModel');

    var ArticlesCollection = Backbone.Collection.extend({
            model: ArticleModel,
            initialize: function(opt) {
                if (_.isObject(opt)) this.url = opt.url
                else {
                    console.log('error fetching ArticlesCollection');
                    return false;
                };
                this.fetch({
                    success: function(coll, res) {
                        console.log('---fetching---');
                        coll.trigger('cUpdate')
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