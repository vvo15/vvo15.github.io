import { escapeHTML } from "./utils.js";

export default function renderFooter(about) {
  const footer = document.querySelector("#site-footer");

  footer.innerHTML = `
    <div class="container footer-inner">
      <p>© ${new Date().getFullYear()} ${escapeHTML(about.name)}</p>
      <nav aria-label="Footer links">
        <ul class="footer-links">
          <li><a href="mailto:${escapeHTML(about.email)}">Email</a></li>
          <li><a href="${escapeHTML(about.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="${escapeHTML(about.github)}" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </nav>
    </div>
  `;
}
