export function renderNews(news) {
  return `
      <section id="news" class="section">
        <div class="container">
          <h2 class="news_heading">News</h2>
          <div class="search">
            <input type="search" name="news" placeholder="Search News..." />
          </div>
          <ul id="news-about-me" class="my-news newslist">
            ${news.map(renderNewsItem).join("")}
          </ul>
        </div>
      </section>
    `;
}

export function renderNewsItem(item) {
  return `
      <li>
        <span class="my_dates">${item.date}</span> ${item.text}
      </li>
    `;
}

export function setupNewsSearch(allNews) {
  const search = document.querySelector("#news .search");
  const list = document.querySelector("#news .newslist");

  if (!search || !list) {
    return;
  }

  console.log(search);

  search.addEventListener("input", (e) => {
    console.log(e.currentTarget);
    console.log(e.target);
    console.log(e.target.value);

    const value = e.target.value || "";

    const filtered = allNews.filter((newsItem) => {
      const combined = `${newsItem.date} ${newsItem.text}`;
      return combined.toLowerCase().includes(value.toLowerCase());
    });

    list.innerHTML = filtered.map(renderNewsItem).join("");
  });
}
