define(function(require){
    var Backbone = require('backbone'),
        tSideMenu = require('src/templates/wrapped/tSideMenu');

    var SideMenuView = Backbone.View.extend({

        events: {
            //'click .menu-link': 'tagClick'
        },

        initialize: function(opt) {
            this.template = _.template(tSideMenu, {variable: 'data'});
            this.router = opt.router;
            this.links = {};
            this.articlesCollection = opt.articlesCollection;
            this.listenTo(this.articlesCollection, 'success', this.updateLinks);
        },

        render: function() {
            var curRoute = this.router.current();
            this.$el.html(this.template( {menuLinks: this.links} ));
            if (curRoute.route === 'section') {
                this.selectTag(curRoute.params[0]);
            } else {
                this.router.navigate('section/All', {trigger: true});
            };
        },

        updateLinks: function() {
            this.links['All'] = 0;
            _.each(this.articlesCollection.models, function(article) {
                var tags = article.attributes.tags;
                _.each(tags, function(tag) {
                    if ( !(_.has(this.links, tag)) ) {
                        this.links[tag] = 1;
                    } else {
                        this.links[tag]++;
                    }
                }, this);
                this.links['All']++;
            }, this);
            this.render();
        },

        selectTag: function(tag) {
            $('.menu-link').each(function(i, el) {
                var elTag = $('.menu-link-tag', el);
                if (elTag.text() === tag) {
                    $('.menu-link').removeClass('is-current');
                    $(el).addClass('is-current');
                };
            });
        },
    });

    return SideMenuView;
});