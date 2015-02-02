define(function(require){
    var Backbone = require('backbone'),
        tSidebar = require('src/templates/wrapped/tArticle');

    var ArticleView = Backbone.View.extend({

        events: {
            'click .articleCard-Btn-Close': 'closeSingleView'
        },

        closeSingleView: function() {
            console.log('close');
            //this.router.navigate('section/all', { trigger: true });
            var route = $('.menu-link.is-current .menu-link-tag').text();
            console.log(route);
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
        },

        expand: function() {
            this.$el.addClass('is-visible');
        },

        collapse: function() {
            this.$el.removeClass('is-visible');
        }

    });

    return ArticleView;
});