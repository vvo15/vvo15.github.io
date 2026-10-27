import { escapeHTML } from "./utils.js";

export default function renderAbout(about) {
  return `
    <section id="about" class="section hero-section reveal" aria-labelledby="about-title">
      <div class="container hero-grid">
        <div class="portrait-frame">
          <img
            class="headshot"
            src="${escapeHTML(about.photo)}"
            alt="${escapeHTML(about.photoAlt)}"
            width="${Number(about.photoWidth)}"
            height="${Number(about.photoHeight)}"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </div>
        <div class="hero-copy">
          <p class="eyebrow">Hello, I'm</p>
          <h1 id="about-title">${escapeHTML(about.name)}</h1>
          <p class="hero-title">${escapeHTML(about.title)}</p>
          <p class="hero-bio">${escapeHTML(about.bio)}</p>
          <div class="hero-actions" aria-label="Profile links">
            <a class="button primary-button" href="${escapeHTML(about.resume)}">Resume</a>
            <a class="button secondary-button" href="${escapeHTML(about.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a class="button secondary-button" href="${escapeHTML(about.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a class="button secondary-button" href="mailto:${escapeHTML(about.email)}">Email</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
