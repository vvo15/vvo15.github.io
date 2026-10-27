import { escapeHTML } from "./utils.js";

const NAV_SECTIONS = ["about", "experience", "projects", "news"];

function getStoredTheme() {
  try {
    const theme = localStorage.getItem("portfolio-theme");
    return theme === "light" || theme === "dark" ? theme : null;
  } catch (error) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (error) {
    // The selected theme still applies for this page view.
  }
}

function initializeThemeToggle() {
  const button = document.querySelector("#theme-toggle");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  if (!button) {
    return;
  }

  const applyTheme = (theme, persist = false) => {
    document.documentElement.dataset.theme = theme;
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    button.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

    const colorMeta = document.querySelector('meta[name="theme-color"]');
    if (colorMeta) {
      colorMeta.setAttribute("content", theme === "dark" ? "#12100f" : "#f7f5f1");
    }

    if (persist) {
      storeTheme(theme);
    }
  };

  applyTheme(
    getStoredTheme() || (systemTheme.matches ? "dark" : "light")
  );

  button.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  });

  systemTheme.addEventListener("change", (event) => {
    if (!getStoredTheme()) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}

function initializeMobileMenu() {
  const toggle = document.querySelector("#nav-toggle");
  const menu = document.querySelector("#nav-menu");

  if (!toggle || !menu) {
    return;
  }

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });
}

function initializeActiveNavigation() {
  const links = [...document.querySelectorAll(".nav-menu a[data-section]")];
  const sections = NAV_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);

  if (!links.length || !sections.length) {
    return;
  }

  let scheduled = false;
  const updateActiveLink = () => {
    const headerHeight =
      document.querySelector("#site-header")?.getBoundingClientRect().height || 0;
    const viewportAnchor = headerHeight + (window.innerHeight - headerHeight) * 0.42;
    let activeSection = sections[0].id;
    let closestDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
      const bounds = section.getBoundingClientRect();
      const distance = bounds.top <= viewportAnchor && bounds.bottom >= viewportAnchor
        ? 0
        : Math.min(
            Math.abs(bounds.top - viewportAnchor),
            Math.abs(bounds.bottom - viewportAnchor)
          );

      if (distance < closestDistance) {
        activeSection = section.id;
        closestDistance = distance;
      }
    });

    links.forEach((link) => {
      const isActive = link.dataset.section === activeSection;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    scheduled = false;
  };

  const requestUpdate = () => {
    if (!scheduled) {
      window.requestAnimationFrame(updateActiveLink);
      scheduled = true;
    }
  };

  updateActiveLink();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

export default function renderNavbar(about, isProjectPage = false) {
  const header = document.querySelector("#site-header");
  const sectionHref = (section) =>
    `${isProjectPage ? "index.html" : ""}#${section}`;

  header.innerHTML = `
    <nav class="nav container" aria-label="Primary navigation">
      <a class="brand" href="${sectionHref("about")}">${escapeHTML(about.name)}</a>
      <div class="nav-actions">
        <ul id="nav-menu" class="nav-menu">
          <li><a data-section="about" href="${sectionHref("about")}">About</a></li>
          <li><a data-section="experience" href="${sectionHref("experience")}">Experience</a></li>
          <li><a data-section="projects" href="${sectionHref("projects")}">Projects</a></li>
          <li><a data-section="news" href="${sectionHref("news")}">News</a></li>
        </ul>
        <button id="theme-toggle" class="icon-button theme-toggle" type="button" aria-label="Switch color theme" aria-pressed="false">
          <svg class="sun-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path></svg>
          <svg class="moon-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 14.2A8.4 8.4 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"></path></svg>
        </button>
        <button id="nav-toggle" class="icon-button nav-toggle" type="button" aria-label="Open navigation menu" aria-controls="nav-menu" aria-expanded="false">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
        </button>
      </div>
    </nav>
  `;

  initializeThemeToggle();
  initializeMobileMenu();

  if (!isProjectPage) {
    window.requestAnimationFrame(initializeActiveNavigation);
  }
}
