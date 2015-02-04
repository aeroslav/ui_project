define(function(require){
    var tSideTagsMenu = require('src/templates/wrapped/tSideTagsMenu'),
        tSideStorageMenu = require('src/templates/wrapped/tSideStorageMenu');

    var SideMenuView = Backbone.View.extend({

        initialize: function(opt) {
            this.router = opt.router;
            this.articlesCollection = opt.articlesCollection;
            this.trashBinCids = opt.trashBinCids,
            this.links = {};
            this.selectedSection = '';

            this.listenTo(this.articlesCollection, 'success', this.updateLinks);
            this.listenTo(this.articlesCollection, 'movedToTrash', this.updateLinks);
        },

        templateTags: _.template(tSideTagsMenu, {variable: 'data'}),
        templateStorage: _.template(tSideStorageMenu, {variable: 'data'}),

        render: function() {
            var curRoute = this.router.current(),
                sortedLinks = _.sortBy(_.pairs(this.links), function(el) {
                    return el[1];
                }, this),
                trashCounter = {};
            trashCounter.trashCount = this.trashBinCids.length;
            this.$el.html(this.templateTags( {menuLinks: sortedLinks.reverse() } ) + this.templateStorage(trashCounter));
            if (curRoute.route === 'section') {
                this.selectTag(curRoute.params[0]);
            } else {
                this.router.navigate('section/all', {trigger: true});
            };
        },

        updateLinks: function() {
            this.links = {};
            this.links['All'] = 0;
            _.each(this.articlesCollection.models, function(article) {
                var tags = article.attributes.tags;
                if ( !(_.contains(this.trashBinCids, article.cid) )) {
                    _.each(tags, function(tag) {
                        if ( !(_.has(this.links, tag)) ) {
                            this.links[tag] = 1;
                        } else {
                            this.links[tag]++;
                        }
                    }, this);
                };
                this.links['All']++;
            }, this);
            this.render();
        },

        selectTag: function(tag) {
            $('.menu-link').each(function(i, el) {
                var elTag = $('.menu-link-tag', el);

                if (elTag.text().toLowerCase() === tag) {
                    $('.menu-link').removeClass('is-current');
                    $(el).addClass('is-current');
                };
            });
        },

        selectStorage: function(storageClass) {
            $('.menu-link').removeClass('is-current');
            $(storageClass).addClass('is-current');
        }
    });

    return SideMenuView;
});