import renderAbout from "./About.js";
import renderExperience from "./Experience.js";
import renderNews, { initializeNews } from "./News.js";
import renderProjects, { initializeProjectFilters } from "./Projects.js";

export default function renderMainPage(data) {
  const main = document.querySelector("#main-content");
  document.title = "Vincent Vo | Software, ML & Finance";
  document.body.dataset.page = "home";

  main.innerHTML = [
    renderAbout(data.about),
    renderExperience(data.experience),
    renderProjects(data.projects),
    renderNews(data.news)
  ].join("");

  initializeProjectFilters(data.projects);
  initializeNews(data.news);
}
