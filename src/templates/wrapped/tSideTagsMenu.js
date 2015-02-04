define([], function () {
  return "<ul class=\"menu-tags\">\r\n    <% _.each(data.menuLinks, function(el){ %>\r\n    <li class=\"menu-item\">\r\n        <a href=\"#section/<%= el[0].toLowerCase() %>\" class=\"menu-link\">\r\n            <span class=\"menu-link-tag\"><%=el[0]%></span>\r\n            <span class=\"menu-link-counter\"><%=el[1]%></span>\r\n        </a>\r\n    </li>\r\n    <% }); %>\r\n</ul>";
});
