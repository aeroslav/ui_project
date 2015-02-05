define(function(require){
    var Backbone = require('backbone'),
        ArticlesCollection = require('collections/articles-collection'),
        AppView = require('views/app-view'),
        Router = require('router');

    var router = new Router(),
        articlesCollection = new ArticlesCollection(),
        trashBinIds = [],
        appView = new AppView({
            el: $('body'),
            articlesCollection: articlesCollection,
            trashBinIds: trashBinIds,
            router: router
        });

    articlesCollection.fetchUrl('/json/articles.json');
    articlesCollection.on('success', function() {
        Backbone.history.start();
    });
});