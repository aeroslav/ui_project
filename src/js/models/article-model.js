define(function(require){
    var Backbone = require('backbone');

    var ArticleModel = Backbone.Model.extend({
        default: {
            header: '',
            author: '',
            date: '',
            intro: '',
            text: '',
            tags: []
        },

        initialize: function(opt) {
            this.attributes.intro = opt.text.split('<hr>')[0];
        }
    });

    return ArticleModel;
});