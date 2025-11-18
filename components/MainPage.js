import renderAbout from "./About.js";
import { renderNews, setupNewsSearch } from "./News.js";
import { renderProjects, setupProjectsSearch } from "./Projects.js";

export default function renderMainPage(data) {
  const main = document.querySelector("main");

  main.innerHTML = renderAbout(data.about);
  main.innerHTML += renderNews(data.news);
  main.innerHTML += renderProjects(data.projects);

  setupNewsSearch(data.news);
  setupProjectsSearch(data.projects);
}
