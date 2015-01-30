define(function(require){
    var Backbone = require('backbone'),
        AppView = require('views/appView'),
        Router = require('router');

    var router = new Router();
    

    appView = new AppView({
        router: router
    });

    Backbone.history.start();
});