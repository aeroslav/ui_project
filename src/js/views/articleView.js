define(function(require){
    var tSidebar = require('src/templates/wrapped/tArticle');

    var ArticleView = Backbone.View.extend({

        initialize: function(opt) {
            this.router = opt.router;
            this.articlesCollection = opt.articlesCollection;
        },

        template: _.template(tSidebar, {variable: 'data'}),

        render: function() {
            this.$el.html(this.template(this.article));
        },

        events: {
            'click .articleCard-Btn-Close': 'closeSingleView'
        },

        closeSingleView: function() {
            var route = $('.menu-link.is-current .menu-link-tag').text();
            this.router.navigate('section/'+route.toLowerCase(), { trigger: true });
        },

        showArticle: function(articleModel) {
            this.article = articleModel;
            this.render();
        }
    });

    return ArticleView;
});