<% var rec = data.article.attributes; %>
<article class="article-card" data-id="<%= data.article.id %>">
    <header class="article-card-header">
        <h1 class="article-card-heading"><%=rec.header%></h1>
        <div class="article-card-btns">
            <button class="article-card-Btn article-card-Btn-close icon-cross"></button>
            <button class="article-card-Btn article-card-Btn-trash <%= (data.isTrash) ? 'icon-redo2' : 'icon-bin2' %>"></button>
        </div>
    </header>
    <p class="article-card-info">
        <span class="article-card-author"><%= rec.author %>,</span>
        <span class="article-card-date"><%= rec.date %></span>
    </p>
    <div class="article-card-text"><%= rec.text %></div>
    <div class="article-card-tags">
        <% _.each(rec.tags, function(tag){ %>
            <a href="#section/<%= tag.toLowerCase() %>" class="tag-link"><%= tag %></a>&nbsp;
        <% }) %>
    </div>
</article>