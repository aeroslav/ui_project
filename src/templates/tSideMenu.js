<% _.each(data.menuLinks, function(val, key){ %>
<li class="menu-item">
    <a href="#section/<%= key.toLowerCase() %>" class="menu-link"><span class="menu-link-tag"><%=key%></span><span class="menu-link-counter"><%=val%></span> </a>
</li>
<% }); %>