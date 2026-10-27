import { escapeHTML } from "./utils.js";

export default function renderExperience(experience) {
  const roles = experience
    .map(
      (item) => `
        <li class="timeline-item">
          <article class="timeline-card">
            <div class="timeline-heading">
              <div>
                <h3>${escapeHTML(item.role)}</h3>
                <p class="organization">${escapeHTML(item.company)}</p>
              </div>
              <div class="timeline-meta">
                <p>${escapeHTML(item.period)}</p>
                ${item.location ? `<p>${escapeHTML(item.location)}</p>` : ""}
              </div>
            </div>
            ${
              item.highlights.length
                ? `<ul class="experience-highlights">${item.highlights
                    .map((highlight) => `<li>${escapeHTML(highlight)}</li>`)
                    .join("")}</ul>`
                : ""
            }
          </article>
        </li>
      `
    )
    .join("");

  return `
    <section id="experience" class="section reveal" aria-labelledby="experience-title">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Where I've contributed</p>
          <h2 id="experience-title">Experience</h2>
        </div>
        <ol class="timeline">
          ${roles}
        </ol>
      </div>
    </section>
  `;
}
