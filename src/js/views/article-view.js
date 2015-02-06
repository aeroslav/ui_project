define(function(require){
    var articleTpl = require('src/templates/wrapped/article-tpl');

    var ArticleView = Backbone.View.extend({

        initialize: function(opt) {
            this.router = opt.router;
            this.articlesCollection = opt.articlesCollection;
            this.trashBinIds = opt.trashBinIds;

            this.prevRoute = '';
        },

        template: _.template(articleTpl, {variable: 'data'}),

        events: {
            'click .article-card-Btn-close': 'closeSingleView',
            'click .article-card-Btn-trash': 'deleteFromSingleView'
        },

        closeSingleView: function(e) {
            var articleCard = $(e.target).closest('.article-card'),
                routeId = $('.menu-link.is-current .menu-link-tag').text(),
                closeAnimComplete = (function() {
                    var routeToNav = (this.prevRoute)?(this.prevRoute):('section')+'/'+routeId.toLowerCase();
                    this.router.navigate(routeToNav, { trigger: true });
                }).bind(this) 

            articleCard.animate({
                    'margin-top': 0,
                    'margin-bottom': 0,
                    'height': 0,
                    'opacity': 0
                },{
                    duration: 200,
                    easing: 'swing',
                    complete: closeAnimComplete
            });
            if (!routeId) {
                routeId = 'all'
            };
        },

        deleteFromSingleView: function(e) {
            var removedId = this.$(e.target).closest('.article-card').data('id').toString(),
                isNotAlreadyInTrash = !( _.contains(this.trashBinIds, removedId) );

            if ( isNotAlreadyInTrash ) {
                this.trashBinIds.push(removedId);
                this.articlesCollection.trigger('movedTrash');
            } else {
                this.trashBinIds.splice(this.trashBinIds.indexOf(removedId), 1);
                this.articlesCollection.trigger('movedTrash');
            }
            this.closeSingleView(e);
        },

        showArticle: function(articleModel) {
            this.article = articleModel;
            this.render();
        },

        render: function() {
            var isCurArticleInTrash = _.contains(this.trashBinIds, this.article.id);
            if (isCurArticleInTrash) {
                isTrash = true;
            } else {
                isTrash = false;
            };

            this.$el.html(this.template({
                article: this.article,
                isTrash: isTrash
            }));
        }
    });

    return ArticleView;
});