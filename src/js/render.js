function templateArticle(article) {
  const { urlToImage, title, author, publishedAt, description, sourse } =
    article;
  return `  <li class="card">
      <img src="${urlToImage}" alt="${sourse}" />
      <h3>${title}</h3>
      <h4>${description}</h4>
      <p>${publishedAt}</p>
      <p>${author}</p>
    </li>`;
}

export function templateArticles(articles) {
  return articles.map(templateArticle).join('');
}
