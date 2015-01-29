<div class="articlesList">
<% _.each(data.articles, function(el){
    var rec = el.attributes; %>
    <article>
        <h1><a href="#article=<%= el.cid %>" class="articlesList-article"><%= rec.header %></a></h1>
        <p class="intro"><%= rec.intro %></p>
    </article>
<% }) %>
</div>