<% _.each(data.articles, function(el){
    var rec = el.attributes; %>
    <article class="article-card" data-id="<%= el.id %>">
        <h2 class="article-card-heading"><a href="#article/<%= el.id %>"><%= rec.header %></a></h2>
        <p class="article-card-info">
            <span class="article-card-author"><%= rec.author %>,</span>
            <span class="article-card-date"><%= rec.date %></span>
        </p>
        <div class="article-card-intro"><%= rec.intro %></div>
        <div class="article-card-tags">
            <% _.each(rec.tags, function(tag){ %>
                <a href="#section/<%= tag.toLowerCase() %>" class="tag-link"><%= tag %></a>&nbsp;
            <% }) %>
        </div>
        <div class="article-card-btns">
            <button class="article-card-Btn article-card-Btn-trash <%= (data.isTrash)?'icon-redo2':'icon-bin2' %>"></button>
        </div>
    </article>
<% }) %>