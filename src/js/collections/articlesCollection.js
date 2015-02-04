define(function(require){
    var ArticleModel = require('models/articleModel');

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
            },

            getCids: function(criterion) { // criterion = {key: 'keyname', val: 'keyvalue'} || {key: 'keyname', val: [arr of val]}
                if (criterion === 'all') {
                    return _.pluck(this.models, 'cid');
                } else {
                    var returnCid = _.reduce(this.models, function(memo, model) {
                            if ( _.isArray(model.attributes[criterion.key]) ) {
                                if ( _.contains(model.attributes[criterion.key], criterion.val) ) {
                                    memo.push(model.cid)
                                };
                            } else {
                                if ( criterion.val !== model.attributes[criterion.key] ) {
                                    memo.push(model.cid)
                                };
                            };
                            return memo;
                        }, []);
                    return returnCid;
                }
            }
        });

    return ArticlesCollection;
});