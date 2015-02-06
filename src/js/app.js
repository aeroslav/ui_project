define(function(require){
    var Backbone = require('backbone'),
        ArticlesCollection = require('collections/articles-collection'),
        AppView = require('views/app-view'),
        Router = require('router');

    var router = new Router(),                          // creating instance of router,
        articlesCollection = new ArticlesCollection(),  // collection for data from server,
        trashBinIds = [],                               // array for ids of articles moved to trash,
        appView = new AppView({                         // and pass it to AppView instance
            el: $('body'),
            articlesCollection: articlesCollection,
            trashBinIds: trashBinIds,
            router: router
        });

    articlesCollection.fetchUrl('/json/articles.json'); // after init appView, fetch data from server
    articlesCollection.on('success', function() {       // initializing router after fetching collection
        Backbone.history.start();
    });
});