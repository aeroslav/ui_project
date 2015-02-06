define([], function () {
  return "<% _.each(data.articles, function(el){\r\n    var rec = el.attributes; %>\r\n    <article class=\"article-card\" data-id=\"<%= el.id %>\">\r\n        <header class=\"article-card-header cf\">\r\n            <h2 class=\"article-card-heading\"><a href=\"#article/<%= el.id %>\"><%= rec.header %></a></h2>\r\n            <div class=\"article-card-btns\">\r\n                <button class=\"article-card-Btn article-card-Btn-trash <%= (data.isTrash)?'icon-redo2':'icon-bin2' %>\"></button>\r\n            </div>\r\n        </header>\r\n        <p class=\"article-card-info\">\r\n            <span class=\"article-card-author\"><%= rec.author %>,</span>\r\n            <span class=\"article-card-date\"><%= rec.date %></span>\r\n        </p>\r\n        <div class=\"article-card-intro\"><%= rec.intro %></div>\r\n        <div class=\"article-card-tags\">\r\n            <% _.each(rec.tags, function(tag){ %>\r\n                <a href=\"#section/<%= tag.toLowerCase() %>\" class=\"tag-link\"><%= tag %></a>&nbsp;\r\n            <% }) %>\r\n        </div>\r\n    </article>\r\n<% }) %>";
});
