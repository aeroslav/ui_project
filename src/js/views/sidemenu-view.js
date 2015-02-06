define(function(require){
    var sideTagsMenuTpl = require('src/templates/wrapped/side-tags-menu-tpl'),
        sideStorageMenu = require('src/templates/wrapped/side-storage-menu-tpl');

    var SideMenuView = Backbone.View.extend({

        initialize: function(opt) { // accepting router, collection of articles and array of trash id from parent
            this.router = opt.router;
            this.articlesCollection = opt.articlesCollection;
            this.trashBinIds = opt.trashBinIds;
            this.links = {}; // hash of records:'tag': 'number-of-articles-with-this-tag'

            this.listenTo(this.articlesCollection, 'success movedTrash add remove reset', this.updateLinks);
        },

        templateTags: _.template(sideTagsMenuTpl, {variable: 'data'}),
        templateStorage: _.template(sideStorageMenu, {variable: 'data'}),

        updateLinks: function() { // form list of tags, count numbers of articles with each tag and render it
            this.links = {};
            this.links['All'] = 0;

            this.articlesCollection.each(function(article) {
                var tags = article.attributes.tags,
                    isArticleNotInTrash = !( _.contains(this.trashBinIds, article.id) );
                if (isArticleNotInTrash) {
                    _.each(tags, function(tag) {
                        if ( !(_.has(this.links, tag)) ) {
                            this.links[tag] = 1;
                        } else {
                            this.links[tag]++;
                        }
                    }, this);
                    this.links['All']++;
                };
            }, this);
            this.render();
        },

        selectTag: function(tag) { // highlight tag in side menu by tag
            this.$('.menu-link').each(function(i, el) {
                var elTag = $('.menu-link-tag', el);

                if (elTag.text().toLowerCase() === tag) {
                    $('.menu-link').removeClass('is-current');
                    $(el).addClass('is-current');
                };
            });
        },

        selectStorage: function(storageClass) { // highlight section by class of menu item in side menu
            $('.menu-link').removeClass('is-current');
            if (storageClass[0] !== '.') {
                storageClass = '.' + storageClass;
            }
            $(storageClass).addClass('is-current');
        },

        render: function() {
            var curRoute = this.router.current(),
                sortedLinks = _.sortBy(_.pairs(this.links), function(el) { // sort tags in descending order
                    return el[1];
                }, this),
                trashCounter = {},
                curRoute = this.router.current();
            trashCounter.trashCount = this.trashBinIds.length;
            this.$el.html( this.templateTags( {menuLinks: sortedLinks.reverse() } ) + this.templateStorage(trashCounter) );

            switch (curRoute.route) { // highlight current menu link
                case 'section':
                    if (curRoute.params[0]) this.selectTag(curRoute.params[0]);
                    break;
                case 'storage':
                    var storageClass = '.menu-link-' + curRoute.params[0];
                    if (curRoute.params[0]) this.selectStorage(storageClass);
                    break;
            }
        }
    });

    return SideMenuView;
});