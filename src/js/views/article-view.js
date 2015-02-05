define(function(require){
    var tSidebar = require('src/templates/wrapped/tArticle');

    var ArticleView = Backbone.View.extend({

        initialize: function(opt) {
            this.router = opt.router;
            this.articlesCollection = opt.articlesCollection;
            this.trashBinIds = opt.trashBinIds;

            this.prevRoute = '';
        },

        template: _.template(tSidebar, {variable: 'data'}),

        render: function() {
            var isTrash = false;
            if ( _.contains(this.trashBinIds, this.article.id) ) isTrash = true;

            this.$el.html(this.template({
                article: this.article,
                isTrash: isTrash
            }));
        },

        events: {
            'click .articleCard-Btn-close': 'closeSingleView',
            'click .articleCard-Btn-trash': 'deleteFromSingleView'
        },

        closeSingleView: function() {
            var routeId = $('.menu-link.is-current .menu-link-tag').text();
            if (!routeId) routeId = 'all';
            this.router.navigate((this.prevRoute)?(this.prevRoute):('section')+'/'+routeId.toLowerCase(), { trigger: true });
        },

        deleteFromSingleView: function(e) {
            var removedId = this.$(e.target).parent().parent().data('id').toString();
            if ( !(_.contains(this.trashBinIds, removedId)) ) {
                this.trashBinIds.push(removedId);
                this.articlesCollection.trigger('movedTrash');
            } else {
                this.trashBinIds.splice(this.trashBinIds.indexOf(removedId), 1);
                this.articlesCollection.trigger('movedTrash');
            }
            this.closeSingleView();
        },

        showArticle: function(articleModel) {
            this.article = articleModel;
            this.render();
        }
    });

    return ArticleView;
});