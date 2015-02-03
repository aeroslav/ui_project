define(function(require){
    var Backbone = require('backbone');

    var ArticleModel = Backbone.Model.extend({
        default: {
            header: '',
            author: '',
            date: '',
            intro: '',
            html: '',
            tags: [],
            marks: []
        },
        initialize: function() {
            this.attributes.marks = []
        }
    });

    return ArticleModel;
});