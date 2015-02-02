define([], function () {
  return "<% var rec = data.attributes; %>\r\n<article class=\"articleCard\">\r\n    <h1 class=\"articleCard-heading\"><%=rec.header%></h1>\r\n    <p class=\"articleCard-info\">\r\n        <span class=\"articleCard-author\"><%= rec.author %>,</span>\r\n        <span class=\"articleCard-date\"><%= rec.date %></span>\r\n    </p>\r\n    <div class=\"articleCard-intro\"><%= rec.intro %></div>\r\n    <div class=\"articleCard-text\"><%= rec.html %></div>\r\n    <div class=\"articleCard-tags\">\r\n        <% _.each(rec.tags, function(tag){ %>\r\n            <a href=\"#section/<%= tag.toLowerCase() %>\" class=\"tag-link\"><%= tag %></a>&nbsp;\r\n        <% }) %>\r\n    </div>\r\n    <div class=\"articleCard-btns\">\r\n        <button class=\"articleCard-Btn articleCard-Btn-Close\"><i class=\"icon-cross\"></i></button>\r\n        <button class=\"articleCard-Btn articleCard-Btn-toTrash\"><i class=\"icon-bin2\"></i></button>\r\n        <button class=\"articleCard-Btn articleCard-Btn-toArchive\"><i class=\"icon-box-add\"></i></button>\r\n    </div>\r\n</article>";
});
