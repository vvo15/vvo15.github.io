import { escapeHTML, renderProjectCover, renderTags } from "./utils.js";

function projectCard(project) {
  return `
    <article class="project-card">
      <div class="project-cover">
        ${renderProjectCover(project)}
      </div>
      <div class="project-card-body">
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.shortDescription)}</p>
        ${renderTags(project.tags)}
        <a class="card-link" href="?project=${encodeURIComponent(project.id)}">
          Read more<span aria-hidden="true"> →</span>
          <span class="sr-only"> about ${escapeHTML(project.title)}</span>
        </a>
      </div>
    </article>
  `;
}

function projectGrid(projects) {
  if (!projects.length) {
    return `<p class="empty-state">No projects match those filters.</p>`;
  }

  return projects.map(projectCard).join("");
}

export default function renderProjects(projects) {
  const tags = [...new Set(projects.flatMap((project) => project.tags))];

  return `
    <section id="projects" class="section reveal" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-heading split-heading">
          <div>
            <p class="eyebrow">Selected work</p>
            <h2 id="projects-title">Projects</h2>
          </div>
          <p>Hackathon builds, full-stack applications, and tools designed around real problems.</p>
        </div>
        <div class="project-tools">
          <div class="search-field">
            <label for="project-search">Search projects</label>
            <input id="project-search" type="search" placeholder="Search by title, description, or tag" autocomplete="off" />
          </div>
          <div class="tag-filters" role="group" aria-label="Filter projects by tag">
            <button class="filter-chip active" type="button" data-tag="all" aria-pressed="true">All</button>
            ${tags
              .map(
                (tag) =>
                  `<button class="filter-chip" type="button" data-tag="${escapeHTML(tag)}" aria-pressed="false">${escapeHTML(tag)}</button>`
              )
              .join("")}
          </div>
          <p id="project-status" class="sr-only" role="status" aria-live="polite"></p>
        </div>
        <div id="project-grid" class="projects-grid">
          ${projectGrid(projects)}
        </div>
      </div>
    </section>
  `;
}

export function initializeProjectFilters(projects) {
  const search = document.querySelector("#project-search");
  const filters = document.querySelector(".tag-filters");
  const grid = document.querySelector("#project-grid");
  const status = document.querySelector("#project-status");

  if (!search || !filters || !grid || !status) {
    return;
  }

  let activeTag = "all";

  const updateProjects = () => {
    const query = search.value.trim().toLowerCase();
    const filtered = projects.filter((project) => {
      const searchableText = [
        project.title,
        project.shortDescription,
        ...project.tags
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = searchableText.includes(query);
      const matchesTag = activeTag === "all" || project.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });

    grid.innerHTML = projectGrid(filtered);
    status.textContent = `${filtered.length} project${filtered.length === 1 ? "" : "s"} shown.`;
  };

  search.addEventListener("input", updateProjects);
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-tag]");

    if (!button) {
      return;
    }

    activeTag = button.dataset.tag;
    filters.querySelectorAll("button[data-tag]").forEach((chip) => {
      const selected = chip === button;
      chip.classList.toggle("active", selected);
      chip.setAttribute("aria-pressed", String(selected));
    });
    updateProjects();
  });
}
