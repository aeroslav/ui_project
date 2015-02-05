<% _.each(data.articles, function(el){
    var rec = el.attributes; %>
    <article class="articleCard" data-id="<%= el.id %>">
        <h2 class="articleCard-heading"><a href="#article/<%= el.id %>"><%= rec.header %></a></h2>
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
            <button class="articleCard-Btn articleCard-Btn--trash <%= (data.isTrash)?'icon-redo2':'icon-bin2' %>"></button>
        </div>
    </article>
<% }) %>