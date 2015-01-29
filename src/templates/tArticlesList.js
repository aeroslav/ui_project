<div class="articlesList">
<% _.each(data.articles, function(el){
    var rec = el.attributes; %>
    <article class="articlesList-article">
        <h2><a href="#article=<%= el.cid %>"><%= rec.header %></a></h2>
        <p class="intro"><%= rec.intro %></p>
    </article>
<% }) %>
</div>