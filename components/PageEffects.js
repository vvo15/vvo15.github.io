const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "news", label: "News" }
];

function initializeRevealAnimations(reducedMotion) {
  const elements = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}

function initializeScrollRail(reducedMotion) {
  const availableSections = SECTIONS.filter(({ id }) =>
    document.getElementById(id)
  );

  if (!availableSections.length) {
    return;
  }

  const indicator = document.createElement("aside");
  indicator.className = "scroll-indicator";
  indicator.setAttribute("aria-label", "Page scroll progress and section navigation");
  indicator.innerHTML = `
    <div class="mobile-progress" aria-hidden="true"><span></span></div>
    <div class="rail-track">
      <div class="rail-progress" aria-hidden="true"></div>
      <div class="rail-train" aria-hidden="true">
        <svg viewBox="0 0 28 32">
          <rect x="3" y="2" width="22" height="25" rx="6"></rect>
          <path d="M8 8h12v7H8zM8 23l-3 6M20 23l3 6M9 29h10"></path>
          <circle cx="9" cy="20" r="1.5"></circle>
          <circle cx="19" cy="20" r="1.5"></circle>
        </svg>
      </div>
      ${availableSections
        .map(
          ({ id, label }) => `
            <button class="rail-stop" type="button" data-section="${id}" aria-label="Scroll to ${label}">
              <span class="rail-tooltip" aria-hidden="true">${label}</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
  document.body.append(indicator);

  const stopButtons = [...indicator.querySelectorAll(".rail-stop")];

  stopButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById(button.dataset.section)?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth"
      });
    });
  });

  let scheduled = false;
  const updateIndicator = () => {
    const headerHeight =
      document.querySelector("#site-header")?.getBoundingClientRect().height || 0;
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    const pageProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    const viewportAnchor = headerHeight + (window.innerHeight - headerHeight) * 0.42;

    const stopPositions = availableSections.map(({ id }) => {
      const section = document.getElementById(id);
      return Math.min(
        Math.max((section.offsetTop - headerHeight) / maxScroll, 0),
        1
      );
    });

    let activeIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    availableSections.forEach(({ id }, index) => {
      const bounds = document.getElementById(id).getBoundingClientRect();
      const distance = bounds.top <= viewportAnchor && bounds.bottom >= viewportAnchor
        ? 0
        : Math.min(
            Math.abs(bounds.top - viewportAnchor),
            Math.abs(bounds.bottom - viewportAnchor)
          );

      if (distance < closestDistance) {
        activeIndex = index;
        closestDistance = distance;
      }
    });

    indicator.style.setProperty("--page-progress", `${pageProgress * 100}%`);
    indicator.style.setProperty(
      "--train-position",
      `${stopPositions[activeIndex] * 100}%`
    );

    stopButtons.forEach((button, index) => {
      button.style.setProperty("--stop-position", `${stopPositions[index] * 100}%`);
      button.classList.toggle("passed", index < activeIndex);
      button.classList.toggle("active", index === activeIndex);
      if (index === activeIndex) {
        button.setAttribute("aria-current", "location");
      } else {
        button.removeAttribute("aria-current");
      }
    });
    scheduled = false;
  };

  const requestUpdate = () => {
    if (!scheduled) {
      window.requestAnimationFrame(updateIndicator);
      scheduled = true;
    }
  };

  updateIndicator();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

export default function initializePageEffects({ showScrollRail = false } = {}) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  initializeRevealAnimations(reducedMotion);

  if (showScrollRail) {
    initializeScrollRail(reducedMotion);
  }
}
