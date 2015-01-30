define([], function () {
  return "<div class=\"articlesList\">\r\n<% _.each(data.articles, function(el){\r\n    var rec = el.attributes; %>\r\n    <article class=\"articlesList-article\">\r\n        <h2><a href=\"#article=<%= el.cid %>\"><%= rec.header %></a></h2>\r\n        <p class=\"articlesList-article-info\">\r\n            <span class=\"articlesList-article-author\"><%= rec.author %>,</span>\r\n            <span class=\"articlesList-article-date\"><%= rec.date %></span>\r\n        </p>\r\n        <div class=\"articlesList-article-intro\"><%= rec.intro %></div>\r\n        <div class=\"articlesList-article-tags\">\r\n            <% _.each(rec.tags, function(tag){ %>\r\n                <a href=\"#section/<%=tag%>\" class=\"tag-link\"><%= tag %></a>&nbsp;\r\n            <% }) %>\r\n        </div>\r\n        <div class=\"articleList-article\">\r\n            <button href=\"\" class=\"articleList-article-archiveBtn\"><i class=\"icon-box-add\"></i></button>\r\n            <button href=\"\" class=\"articleList-article-removeBtn\"><i class=\"icon-bin2\"></i></button>\r\n        </div>\r\n    </article>\r\n<% }) %>\r\n</div>";
});
