import { escapeHTML } from "./utils.js";

const INITIAL_NEWS_COUNT = 5;

function newsItems(items) {
  if (!items.length) {
    return `<li class="empty-state">No updates match your search.</li>`;
  }

  return items
    .map(
      (item) => `
        <li class="news-item">
          <time datetime="${escapeHTML(item.datetime)}">${escapeHTML(item.date)}</time>
          <p>${escapeHTML(item.text)}</p>
        </li>
      `
    )
    .join("");
}

export default function renderNews(news) {
  return `
    <section id="news" class="section reveal" aria-labelledby="news-title">
      <div class="container">
        <div class="section-heading split-heading">
          <div>
            <p class="eyebrow">Recent milestones</p>
            <h2 id="news-title">News</h2>
          </div>
          <div class="search-field news-search">
            <label for="news-search">Search updates</label>
            <input id="news-search" type="search" placeholder="Search news" autocomplete="off" />
          </div>
        </div>
        <p id="news-status" class="sr-only" role="status" aria-live="polite"></p>
        <ol id="news-list" class="news-list">
          ${newsItems(news.slice(0, INITIAL_NEWS_COUNT))}
        </ol>
        <button id="news-toggle" class="button secondary-button news-toggle" type="button" aria-expanded="false" ${news.length <= INITIAL_NEWS_COUNT ? "hidden" : ""}>
          Show all updates
        </button>
      </div>
    </section>
  `;
}

export function initializeNews(news) {
  const search = document.querySelector("#news-search");
  const list = document.querySelector("#news-list");
  const toggle = document.querySelector("#news-toggle");
  const status = document.querySelector("#news-status");

  if (!search || !list || !toggle || !status) {
    return;
  }

  let expanded = false;
  let filteredNews = news;

  const updateNews = () => {
    const visibleNews = expanded
      ? filteredNews
      : filteredNews.slice(0, INITIAL_NEWS_COUNT);

    list.innerHTML = newsItems(visibleNews);
    toggle.hidden = filteredNews.length <= INITIAL_NEWS_COUNT;
    toggle.textContent = expanded ? "Show recent only" : "Show all updates";
    toggle.setAttribute("aria-expanded", String(expanded));
    status.textContent = `${visibleNews.length} of ${filteredNews.length} update${filteredNews.length === 1 ? "" : "s"} shown.`;
  };

  search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    filteredNews = news.filter((item) =>
      `${item.date} ${item.text}`.toLowerCase().includes(query)
    );
    expanded = false;
    updateNews();
  });

  toggle.addEventListener("click", () => {
    expanded = !expanded;
    updateNews();
  });
}
