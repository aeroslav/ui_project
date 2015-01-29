define(function(require){
    var Backbone = require('backbone'),
        AppView = require('views/appView'),
        ArticlesCollection = require('collections/articlesCollection'),
        Router = require('router');

    var router = new Router();
    Backbone.history.start();

    var articlesCollection = new ArticlesCollection({url: '/json/articles.json'});
        appView = new AppView({
            artColl: articlesCollection
        });
    console.log('app');
});