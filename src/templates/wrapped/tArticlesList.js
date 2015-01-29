define([], function () {
  return "<div class=\"articlesList\">\r\n<% _.each(data.articles, function(el){\r\n    var rec = el.attributes; %>\r\n    <article class=\"articlesList-article\">\r\n        <h2><a href=\"#article=<%= el.cid %>\"><%= rec.header %></a></h2>\r\n        <p class=\"intro\"><%= rec.intro %></p>\r\n    </article>\r\n<% }) %>\r\n</div>";
});
