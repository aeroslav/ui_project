define([], function () {
  return "<% _.each(data.menuLinks, function(val, key){ %>\r\n<li class=\"menu-item\">\r\n    <a href=\"#section/<%=key%>\" class=\"menu-link\"><span class=\"menu-link-tag\"><%=key%></span><span class=\"menu-link-counter\"><%=val%></span> </a>\r\n</li>\r\n<% }); %>";
});
