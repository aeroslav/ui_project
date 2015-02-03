define([], function () {
  return "<% _.each(data.articles, function(el){\r\n    var rec = el.attributes; %>\r\n    <article class=\"articleCard\" data-cid=\"<%= el.cid %>\">\r\n        <h2 class=\"articleCard-heading\"><a href=\"#article/<%= el.cid %>\"><%= rec.header %></a></h2>\r\n        <p class=\"articleCard-info\">\r\n            <span class=\"articleCard-author\"><%= rec.author %>,</span>\r\n            <span class=\"articleCard-date\"><%= rec.date %></span>\r\n        </p>\r\n        <div class=\"articleCard-intro\"><%= rec.intro %></div>\r\n        <div class=\"articleCard-tags\">\r\n            <% _.each(rec.tags, function(tag){ %>\r\n                <a href=\"#section/<%= tag.toLowerCase() %>\" class=\"tag-link\"><%= tag %></a>&nbsp;\r\n            <% }) %>\r\n        </div>\r\n        <div class=\"articleCard-btns\">\r\n            <button class=\"articleCard-Btn articleCard-Btn-mark articleCard-Btn-toTrash\" data-action=\"trash\"><i class=\"icon-bin2\"></i></button>\r\n            <button class=\"articleCard-Btn articleCard-Btn-mark articleCard-Btn-toArchive\" data-action=\"archive\"><i class=\"icon-box-add\"></i></button>\r\n        </div>\r\n    </article>\r\n<% }) %>";
});
