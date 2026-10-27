const HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
};

export function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => HTML_ENTITIES[character]);
}

export function renderTags(tags = []) {
  return `
    <ul class="tag-list" aria-label="Technologies and topics">
      ${tags.map((tag) => `<li>${escapeHTML(tag)}</li>`).join("")}
    </ul>
  `;
}

export function renderProjectCover(project, { detail = false } = {}) {
  const source = detail
    ? project.detailImage || project.cardImage
    : project.cardImage;
  const alt = detail
    ? project.detailImageAlt || project.cardAlt
    : project.cardAlt;
  const width = detail
    ? project.detailImageWidth || project.cardImageWidth
    : project.cardImageWidth;
  const height = detail
    ? project.detailImageHeight || project.cardImageHeight
    : project.cardImageHeight;

  if (!source) {
    return `
      <div
        class="generated-cover${detail ? " generated-cover-detail" : ""}"
        role="img"
        aria-label="${escapeHTML(alt || `${project.title} project cover`)}"
      >
        <span>${escapeHTML(project.title)}</span>
      </div>
    `;
  }

  return `
    <img
      class="project-cover-image${detail ? " detail-cover-image" : ""}"
      src="${escapeHTML(source)}"
      alt="${escapeHTML(alt)}"
      width="${Number(width)}"
      height="${Number(height)}"
      loading="lazy"
      decoding="async"
    />
  `;
}
