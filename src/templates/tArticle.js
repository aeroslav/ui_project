<% var rec = data.attributes; %>
<article class="articleCard">
    <h1 class="articleCard-heading"><%=rec.header%></h1>
    <p class="articleCard-info">
        <span class="articleCard-author"><%= rec.author %>,</span>
        <span class="articleCard-date"><%= rec.date %></span>
    </p>
    <div class="articleCard-intro"><%= rec.intro %></div>
    <div class="articleCard-text"><%= rec.html %></div>
    <div class="articleCard-tags">
        <% _.each(rec.tags, function(tag){ %>
            <a href="#section/<%= tag.toLowerCase() %>" class="tag-link"><%= tag %></a>&nbsp;
        <% }) %>
    </div>
    <div class="articleCard-btns">
        <button class="articleCard-Btn articleCard-Btn-Close icon-cross"></button>
        <button class="articleCard-Btn articleCard-Btn-toTrash icon-bin2"></button>
    </div>
</article>