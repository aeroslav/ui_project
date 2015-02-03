define(function(require){
    var Backbone = require('backbone'),
        ArticleModel = require('models/articleModel');

    var ArticlesCollection = Backbone.Collection.extend({

            model: ArticleModel,

            fetchUrl: function(url) {
                this.url = url;
                this.fetch({
                    success: function(coll, res) {
                        coll.trigger('success');
                    },
                    error: function(coll, res) {
                        console.log('error fetching ArticlesCollection', res);
                    },
                    reset: true
                });
                this.on('change', function() {
                    console.log('ArticlesCollection change');
                })
            },

            getCids: function(criterion) { // criterion = {key: 'keyname', val: 'keyvalue'} || {key: 'keyname', val: [arr of val]}
                if (criterion === 'all') {
                    console.log(_.pluck(this.models, 'cid'));
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