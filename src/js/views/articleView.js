define(function(require){
    var Backbone = require('backbone'),
        tSidebar = require('src/templates/wrapped/tArticle');

    var ArticleView = Backbone.View.extend({

        events: {
            'click .articleCard-Btn-Close': 'closeSingleView'
        },

        closeSingleView: function() {
            var route = $('.menu-link.is-current .menu-link-tag').text();
            this.router.navigate('section/'+route.toLowerCase(), { trigger: true });
        },

        initialize: function(opt) {
            this.router = opt.router;
        },

        template: _.template(tSidebar, {variable: 'data'}),

        render: function() {
            this.$el.html(this.template(this.article));
        },

        showArticle: function(article) {
            this.article = article;
            this.render();
        }
    });

    return ArticleView;
});