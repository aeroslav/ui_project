define(function(require){
    var Backbone = require('backbone'),
        ArticlesCollection = require('collections/articlesCollection'),
        AppView = require('views/appView'),
        Router = require('router');

    var router = new Router(),
        articlesCollection = new ArticlesCollection(),
        trashBinCids = [],
        appView = new AppView({
            el: $('body'),
            articlesCollection: articlesCollection,
            trashBinCids: trashBinCids,
            router: router
        });

    articlesCollection.fetchUrl('/json/articles.json');

    Backbone.history.start();
});