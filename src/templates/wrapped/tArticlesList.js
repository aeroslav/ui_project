define([], function () {
  return "<div class=\"articlesList\">\r\n<% _.each(data.articles, function(el){\r\n    var rec = el.attributes; %>\r\n    <article>\r\n        <h1><a href=\"#article=<%= el.cid %>\" class=\"articlesList-article\"><%= rec.header %></a></h1>\r\n        <p class=\"intro\"><%= rec.intro %></p>\r\n    </article>\r\n<% }) %>\r\n</div>";
});
