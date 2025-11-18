export function renderProjects(projects) {
  return `
      <section id="projects" class="section">
        <div class="container">
          <h2 class="news_heading">Projects</h2>
          <div class="search project-search">
            <input type="search" name="projects" placeholder="Search Projects..." />
          </div>
          <div class="projects-grid projectslist">
            ${projects.map(renderProject).join("")}
          </div>
        </div>
      </section>
    `;
}

export function renderProject(project) {
  return `
      <article class="card">
        <img class="card-cover" src="${project.cardImage}" alt="${project.cardAlt}" />
        <div class="card-body">
          <h3 class="card-title">${project.title}</h3>
          <p class="card-text">${project.shortDescription}</p>
        </div>
        <div class="card-actions">
          <a class="button" href="?project=${project.id}">Read more</a>
        </div>
      </article>
    `;
}

export function setupProjectsSearch(allProjects) {
  const search = document.querySelector("#projects .project-search");
  const list = document.querySelector("#projects .projectslist");

  if (!search || !list) {
    return;
  }

  console.log(search);

  search.addEventListener("input", (e) => {
    console.log(e.currentTarget);
    console.log(e.target);
    console.log(e.target.value);

    const value = e.target.value || "";

    const filtered = allProjects.filter((project) => {
      const combined = `${project.title} ${project.shortDescription}`;
      return combined.toLowerCase().includes(value.toLowerCase());
    });

    list.innerHTML = filtered.map(renderProject).join("");
  });
}
