define(function(require){
    var //Backbone = require('backbone'),
        //ArticlesCollection = require('collections/articlesCollection'),
        tArticlesList = require('src/templates/wrapped/tArticlesList');

    var ArticlesListView = Backbone.View.extend({

        initialize: function(opt) {
            this.curTag = 'all';
            this.articlesCollection = opt.articlesCollection;
            this.curArticlesCid = [];
            this.listenTo(this.articlesCollection, 'success', this.updateArticlesList);
        },

        events: {
            'click .articleCard-Btn-mark': 'markArticleAs'
        },

        template: _.template(tArticlesList, {variable: 'data'}),

        render: function() {
            var articlesToRender = _.filter(this.articlesCollection.models, function(model) {
                return _.contains(this.curArticlesCid, model.cid);
            }, this);
            this.$el.html(this.template({ articles: articlesToRender }));
        },

        setCurTag: function(tag) {
            this.curTag = tag;
            this.updateArticlesList();
        },

        updateArticlesList: function(tag, mark) {
            this.curArticlesCid = [];
            if (tag) this.curTag = tag
            else tag = this.curTag;

            if (tag) {
                _.each(this.articlesCollection.models, function(article) {
                    var tags = _.map(article.attributes.tags, function(el) {
                        return el.toLowerCase();
                    });
                    if (tag !== 'all') {
                        if (_.contains(tags, tag)) {
                            this.curArticlesCid.push(article.cid);
                        }
                    } else {
                        this.curArticlesCid.push(article.cid);
                    }
                }, this);
            };
            if (mark) {
                var filteredCids = this.curArticlesCid;
                this.curArticlesCid = [];
                _.each(filteredCids, function(cid) {
                    if ( _.contains(this.articlesCollection.get(cid).attributes.marks, mark) ) {
                        this.curArticlesCid.push(cid);
                    }
                }, this);
            };

            this.render();
        },

        markArticleAs: function(e) {
            console.log('markArticleAs');
            var btn = $(e.currentTarget);
                markAs = btn.data('action'),
                markCid = btn.parent().parent().data('cid'),
                marks = this.articlesCollection.get(markCid).attributes.marks;
            if ( !(_.contains(marks, markAs)) ) {
                marks.push(markAs);
            }
        }
    });

    return ArticlesListView;
});