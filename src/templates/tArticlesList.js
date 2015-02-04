<% _.each(data.articles, function(el){
    var rec = el.attributes; %>
    <article class="articleCard" data-cid="<%= el.cid %>">
        <h2 class="articleCard-heading"><a href="#article/<%= el.cid %>"><%= rec.header %></a></h2>
        <p class="articleCard-info">
            <span class="articleCard-author"><%= rec.author %>,</span>
            <span class="articleCard-date"><%= rec.date %></span>
        </p>
        <div class="articleCard-intro"><%= rec.intro %></div>
        <div class="articleCard-tags">
            <% _.each(rec.tags, function(tag){ %>
                <a href="#section/<%= tag.toLowerCase() %>" class="tag-link"><%= tag %></a>&nbsp;
            <% }) %>
        </div>
        <div class="articleCard-btns">
            <button class="articleCard-Btn articleCard-Btn--toTrash icon-bin2"></button>
        </div>
    </article>
<% }) %>