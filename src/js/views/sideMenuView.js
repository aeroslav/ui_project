define(function(require){
    var Backbone = require('backbone'),
        tSideMenu = require('src/templates/wrapped/tSideMenu');

    var tFnSideMenu = _.template(tSideMenu, {variable: 'data'}),
        links = [];
    var SideMenuView = Backbone.View.extend({
        initialize: function(opt) {
            this.artColl = opt.artColl;

            this.listenTo(this.artColl, 'cUpdate', this.updateLinks);
            this.listenTo(opt.router, 'route:section', function(sec) {
                var menuLinks = $('.menu-link');
                menuLinks.removeClass('is-current');
                menuLinks.each(function(i, el) {
                    if (el.text === sec) {
                        $(el).addClass('is-current');
                    };
                });
            })
        },
        render: function() {
            this.$el.html(tFnSideMenu( {menuLinks: links} ));
        },
        updateLinks: function() {
            links = [];
            links.push('All');
            _.each(this.artColl.models, function(article) {
                var tags = article.attributes.tags;
                _.each(tags, function(tag) {
                    if ( !(_.contains(links, tag)) ) {
                        links.push(tag);
                    }
                })
            });
            console.log(links);
            this.render();
        }
    });

    return SideMenuView;
});