define([], function () {
  return "<li class=\"menu-item\">\r\n    <a href=\"#storage/archive\" class=\"menu-link\">\r\n        <span class=\"menu-link-tag\">Storage</span>\r\n        <span class=\"menu-link-counter\"><%=data.storageCount%></span>\r\n    </a>\r\n</li>\r\n<li class=\"menu-item\">\r\n    <a href=\"#storage/trash\" class=\"menu-link\">\r\n        <span class=\"menu-link-tag\">Trash</span>\r\n        <span class=\"menu-link-counter\"><%=data.trashCount%></span>\r\n    </a>\r\n</li>";
});
