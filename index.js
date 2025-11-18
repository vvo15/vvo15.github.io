import renderNavbar from "./components/NavBar.js";
import renderMainPage from "./components/MainPage.js";
import renderProjectDetails from "./components/ProjectDetails.js";

fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("project");
    const page = projectId == null ? "main" : "project-detail";

    renderNavbar();

    if (page === "main") {
      renderMainPage(data);
    } else {
      const project = data.projects.find((p) => p.id === projectId);
      renderProjectDetails(project, data);
    }
  });
