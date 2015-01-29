define([], function () {
  return "<% _.each(data.menuLinks, function(el){ %>\r\n<li class=\"menu-item\">\r\n    <a href=\"#section=<%=el%>\" class=\"menu-link\"><%=el%></a>\r\n</li>\r\n<% }); %>";
});
