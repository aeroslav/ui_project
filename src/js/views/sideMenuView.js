define(function(require){
    var Backbone = require('backbone'),
        tSideMenu = require('src/templates/wrapped/tSideMenu');

    var tFnSideMenu = _.template(tSideMenu, {variable: 'data'}),
        links = [];
    var SideMenuView = Backbone.View.extend({
        initialize: function(opt) {
            this.artColl = opt.artColl;
            this.listenTo(this.artColl, 'cUpdate', this.updateLinks);
        },
        render: function() {
            this.$el.html(tFnSideMenu( {menuLinks: links} ));
        },
        updateLinks: function() {
            links = [];
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