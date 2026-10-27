import renderFooter from "./components/Footer.js";
import renderMainPage from "./components/MainPage.js";
import renderNavbar from "./components/NavBar.js";
import initializePageEffects from "./components/PageEffects.js";
import renderProjectDetails from "./components/ProjectDetails.js";

const main = document.querySelector("#main-content");

async function initializeSite() {
  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error("Portfolio data could not be loaded.");
    }

    const data = await response.json();
    const projectId = new URLSearchParams(window.location.search).get("project");
    const isProjectPage = projectId !== null;

    renderNavbar(data.about, isProjectPage);
    renderFooter(data.about);

    if (isProjectPage) {
      const project = data.projects.find((item) => item.id === projectId);
      renderProjectDetails(project, data.site);
    } else {
      renderMainPage(data);
    }

    initializePageEffects({ showScrollRail: !isProjectPage });
  } catch (error) {
    document.title = "Unable to load | Vincent Vo";
    main.innerHTML = `
      <section class="section error-state" aria-labelledby="load-error-title">
        <div class="container narrow-container">
          <p class="eyebrow">Something went wrong</p>
          <h1 id="load-error-title">The portfolio could not be loaded.</h1>
          <p>Please refresh the page or try again in a moment.</p>
          <a class="button primary-button" href="index.html">Reload the site</a>
        </div>
      </section>
    `;
  }
}

initializeSite();
