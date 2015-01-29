<% _.each(data.menuLinks, function(el){ %>
<li class="menu-item">
    <a href="#/section/<%=el%>" class="menu-link"><%=el%></a>
</li>
<% }); %>