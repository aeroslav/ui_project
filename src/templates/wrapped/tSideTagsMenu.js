define([], function () {
  return "<% _.each(data.menuLinks, function(val, key){ %>\r\n<li class=\"menu-item\">\r\n    <a href=\"#section/<%= key.toLowerCase() %>\" class=\"menu-link\">\r\n        <span class=\"menu-link-tag\"><%=key%></span>\r\n        <span class=\"menu-link-counter\"><%=val%></span>\r\n    </a>\r\n</li>\r\n<% }); %>\r\n";
});
