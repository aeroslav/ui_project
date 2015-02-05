<% var rec = data.article.attributes; %>
<article class="articleCard" data-id="<%= data.article.id %>">
    <h1 class="articleCard-heading"><%=rec.header%></h1>
    <p class="articleCard-info">
        <span class="articleCard-author"><%= rec.author %>,</span>
        <span class="articleCard-date"><%= rec.date %></span>
    </p>
    <div class="articleCard-text"><%= rec.text %></div>
    <div class="articleCard-tags">
        <% _.each(rec.tags, function(tag){ %>
            <a href="#section/<%= tag.toLowerCase() %>" class="tag-link"><%= tag %></a>&nbsp;
        <% }) %>
    </div>
    <div class="articleCard-btns">
        <button class="articleCard-Btn articleCard-Btn-close icon-cross"></button>
        <button class="articleCard-Btn articleCard-Btn-trash <%= (data.isTrash)?'icon-redo2':'icon-bin2' %>"></button>
    </div>
</article>