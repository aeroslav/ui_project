<ul class="menu-tags">
    <% _.each(data.menuLinks, function(el){ %>
    <li class="menu-item">
        <a href="#section/<%= el[0].toLowerCase() %>" class="menu-link">
            <span class="menu-link-tag"><%=el[0]%></span>
            <span class="menu-link-counter"><%=el[1]%></span>
        </a>
    </li>
    <% }); %>
</ul>