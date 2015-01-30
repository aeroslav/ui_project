<div class="articlesList">
<% _.each(data.articles, function(el){
    var rec = el.attributes; %>
    <article class="articlesList-article">
        <h2><a href="#article=<%= el.cid %>"><%= rec.header %></a></h2>
        <p class="articlesList-article-info">
            <span class="articlesList-article-author"><%= rec.author %>,</span>
            <span class="articlesList-article-date"><%= rec.date %></span>
        </p>
        <div class="articlesList-article-intro"><%= rec.intro %></div>
        <div class="articlesList-article-tags">
            <% _.each(rec.tags, function(tag){ %>
                <a href="#section/<%=tag%>" class="tag-link"><%= tag %></a>&nbsp;
            <% }) %>
        </div>
        <div class="articleList-article">
            <button href="" class="articleList-article-archiveBtn"><i class="icon-box-add"></i></button>
            <button href="" class="articleList-article-removeBtn"><i class="icon-bin2"></i></button>
        </div>
    </article>
<% }) %>
</div>