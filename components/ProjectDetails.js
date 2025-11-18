export default function renderProjectDetails(project, data) {
  const main = document.querySelector("main");

  if (!project) {
    main.innerHTML = `
        <section class="section">
          <div class="container">
            <p>Project not found.</p>
            <p><a href="index.html#projects">Back to projects</a></p>
          </div>
        </section>
      `;
    return;
  }

  main.innerHTML = `
      <section id="about" class="section">
        <div class="main-about">
          <div class="about-left">
            <img class="headshot" src="${project.logo}" alt="${project.logoAlt}" />
            <h1 class="title">${project.title}</h1>
            <p class="subtitle">${project.subtitle}</p>
            <p style="margin-top: 15px">
              <a class="button" href="${data.about.github}" target="_blank">GitHub</a>
            </p>
          </div>
          <div class="about-right">
            <a href="${project.detailImage}" target="_blank">
              <img class="card-cover" src="${project.detailImage}" alt="${project.detailImageAlt}" />
            </a>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <h2 class="news_heading">Overview</h2>
          <p style="margin-top: 10px">
            ${project.detailDescription}
          </p>
          <p style="margin-top: 20px">
            <a class="button" href="index.html#projects">Back to main page</a>
          </p>
        </div>
      </section>
    `;
}
