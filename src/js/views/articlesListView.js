define(function(require){
    var tArticlesList = require('src/templates/wrapped/tArticlesList');

    var ArticlesListView = Backbone.View.extend({

        initialize: function(opt) {
            this.articlesCollection = opt.articlesCollection;
            this.trashBinCids = opt.trashBinCids,

            this.curTag = 'all';
            this.curArticlesCid = [];
            this.listenTo(this.articlesCollection, 'success', this.updateArticlesList);
        },

        template: _.template(tArticlesList, {variable: 'data'}),

        render: function() {
            var articlesToRender = _.filter(this.articlesCollection.models, function(model) {
                return _.contains(this.curArticlesCid, model.cid);
            }, this);
            this.$el.html(this.template({ articles: articlesToRender }));
            console.log('trashBinCids =', this.trashBinCids);
            console.log('curArticlesCid =', this.curArticlesCid);
        },

        renderTrash: function() {
            var articlesToRender = _.filter(this.articlesCollection.models, function(model) {
                return _.contains(this.trashBinCids, model.cid);
            }, this);
            this.$el.html(this.template({ articles: articlesToRender }));
        },

        events: {
            'click .articleCard-Btn--toTrash': 'removeToTrash'
        },

        setCurTag: function(tag) {
            this.curTag = tag;
            this.updateArticlesList();
        },

        updateArticlesList: function(tag) {
            this.curArticlesCid = [];
            if (tag) this.curTag = tag
            else tag = this.curTag;

            if (tag) {
                _.each(this.articlesCollection.models, function(article) {
                    var tags = _.map(article.attributes.tags, function(el) {
                        return el.toLowerCase();
                    });
                    if (tag !== 'all') {
                        if (_.contains(tags, tag) && !(_.contains(this.trashBinCids, article.cid)) ) {
                            this.curArticlesCid.push(article.cid);
                        }
                    } else {
                        if ( !( _.contains(this.trashBinCids, article.cid) )) {
                            this.curArticlesCid.push(article.cid);
                        }
                    }
                }, this);
            };

            this.render();
        },

        setCids: function(cids) {
            this.curArticlesCid = cids;
            this.render();
        },

        removeToTrash: function(e) {
            var removedCid = $(e.target).parent().parent().data('cid');
            if ( !(_.contains(this.trashBinCids, removedCid)) ) {
                this.trashBinCids.push(removedCid);
            };
            this.curArticlesCid = _.without(this.curArticlesCid, removedCid);
            this.articlesCollection.trigger('movedToTrash');
            this.render();
        }
    });

    return ArticlesListView;
});