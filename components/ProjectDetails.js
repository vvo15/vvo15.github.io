import { escapeHTML, renderProjectCover, renderTags } from "./utils.js";

function updateMeta(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.setAttribute("content", value);
  }
}

export default function renderProjectDetails(project, site) {
  const main = document.querySelector("#main-content");
  document.body.dataset.page = "project";

  if (!project) {
    document.title = `Project not found | ${site.name}`;
    main.innerHTML = `
      <section class="section error-state" aria-labelledby="not-found-title">
        <div class="container narrow-container">
          <p class="eyebrow">404</p>
          <h1 id="not-found-title">Project not found.</h1>
          <p>That project may have moved or the link may be incorrect.</p>
          <a class="button primary-button" href="index.html#projects">Back to projects</a>
        </div>
      </section>
    `;
    return;
  }

  document.title = `${project.title} | ${site.name}`;
  updateMeta('meta[name="description"]', project.shortDescription);
  updateMeta('meta[property="og:title"]', `${project.title} | ${site.name}`);
  updateMeta('meta[property="og:description"]', project.shortDescription);
  updateMeta('meta[name="twitter:title"]', `${project.title} | ${site.name}`);
  updateMeta('meta[name="twitter:description"]', project.shortDescription);

  const paragraphs = Array.isArray(project.detailDescription)
    ? project.detailDescription
    : [project.detailDescription];

  main.innerHTML = `
    <article class="project-detail">
      <header class="section detail-header reveal">
        <div class="container detail-heading">
          <a class="back-link" href="index.html#projects"><span aria-hidden="true">←</span> Back to projects</a>
          <p class="eyebrow">Project case study</p>
          <h1>${escapeHTML(project.title)}</h1>
          <p class="detail-subtitle">${escapeHTML(project.subtitle)}</p>
        </div>
      </header>

      <section class="section detail-content reveal" aria-label="${escapeHTML(project.title)} project details">
        <div class="container">
          <div class="detail-cover">
            ${renderProjectCover(project, { detail: true })}
          </div>

          <dl class="project-facts">
            <div>
              <dt>My role</dt>
              <dd>${escapeHTML(project.role)}</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>${escapeHTML(project.team)}</dd>
            </div>
            <div>
              <dt>Tech</dt>
              <dd>${renderTags(project.tags)}</dd>
            </div>
          </dl>

          <div class="detail-narrative">
            <h2>Overview</h2>
            ${paragraphs.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
            <div class="detail-actions">
              ${
                project.repo
                  ? `<a class="button primary-button" href="${escapeHTML(project.repo)}" target="_blank" rel="noopener noreferrer">View project on GitHub</a>`
                  : ""
              }
              <a class="text-link" href="index.html#projects"><span aria-hidden="true">←</span> Back to all projects</a>
            </div>
          </div>
        </div>
      </section>
    </article>
  `;
}
