<% _.each(data.articles, function(el){
    var rec = el.attributes; %>
    <article class="articleCard">
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
            <button class="articleCard-Btn articleCard-Btn-toTrash"><i class="icon-bin2"></i></button>
            <button class="articleCard-Btn articleCard-Btn-toArchive"><i class="icon-box-add"></i></button>
        </div>
    </article>
<% }) %>