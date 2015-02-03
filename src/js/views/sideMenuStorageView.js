define(function(require){
    'use strict';
    var Backbone = require('backbone'),
        ArticlesCollection = require('collections/articlesCollection'),
        tSideStorageMenu = require('src/templates/wrapped/tSideStorageMenu');

    var SideMenuStorageView = Backbone.View.extend({

        initialize: function(opt) {
            this.router = opt.router;
            this.articlesCollection = opt.articlesCollection;
            this.articlesStorage = [];
            this.listenTo(this.articlesCollection, 'success change', function() {
                this.articlesStorage = this.articlesCollection.getCids('all');
                this.updateCounters();
            });
        },

        template: _.template(tSideStorageMenu, {variable: 'data'}),

        render: function() {
            var rendered = this.template({
                storageCount: this.storageCount,
                trashCount: this.trashCount
            });
            this.$el.html(rendered);
        },

        updateCounters: function() {
            this.storageCount = 0;
            this.trashCount = 0;
            _.each(this.articlesCollection.models, function(el){
                var rec = el.attributes;
                if (_.contains(rec.marks, 'archive')) {
                    this.storageCount++;
                };
                if (_.contains(rec.marks, 'trash')) {
                    this.trashCount++;
                };
            }, this);

            this.render();
        },

        /*updateArticlesStorage: function(mark) {
            this.articlesStorage = [];
            _.each(this.articles.models, function(model) {
                if (_.contains(model.attributes.marks, mark)) {
                    this.articlesStorage.push(model.cid);
                };
            }, this);
            this.updateCounters();
            return this.articlesStorage;
        }*/
    });

    return SideMenuStorageView;
});