fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("project");
    const page = projectId == null ? "main" : "project-detail";

    if (page === "main") {
      renderMainPage(data);
    } else {
      const project = data.projects.find((p) => p.id === projectId);
      renderProjectDetails(project, data);
    }

    setYear();
    setupNavToggle();
  });

function setYear() {
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function setupNavToggle() {
  var toggleButton = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");

  if (toggleButton && menu) {
    toggleButton.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }
}

function renderMainPage(data) {
  const main = document.querySelector("main");
  main.innerHTML = renderAbout(data.about);
  main.innerHTML += renderNews(data.news);
  main.innerHTML += renderProjects(data.projects);
}

function renderAbout(about) {
  return `
    <section id="about" class="section">
      <div class="main-about">
        <div class="about-left">
          <img class="headshot" src="${about.photo}" alt="My Photo" />
          <h1 class="title">${about.name}</h1>
          <p class="subtitle">${about.title}</p>
          <ul class="contact">
            <li>
              <img class="icon" src="phone.png" alt="" />
              <strong>Phone:</strong> ${about.phone}
            </li>
            <li>
              <img class="icon" src="mail.png" alt="" />
              <strong>Email:</strong> ${about.email}
            </li>
          </ul>
          <p class="links">
            <a href="${about.resume}" target="_blank">Resume</a> •
            <a href="${about.linkedin}" target="_blank">LinkedIn</a> •
            <a href="${about.github}" target="_blank">GitHub</a>
          </p>
        </div>
        <div class="about-right">
          <p class="bio">${about.bio}</p>
        </div>
      </div>
    </section>
  `;
}

function renderNews(news) {
  return `
    <section id="news" class="section">
      <div class="container">
        <h2 class="news_heading">News</h2>
        <ul id="news-about-me" class="my-news">
          ${news
            .map(
              (item) => `
            <li>
              <span class="my_dates">${item.date}</span> ${item.text}
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    </section>
  `;
}

function renderProjects(projects) {
  return `
    <section id="projects" class="section">
      <div class="container">
        <h2 class="news_heading">Projects</h2>
        <div class="projects-grid">
          ${projects.map((p) => renderProject(p)).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderProject(project) {
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

function renderProjectDetails(project, data) {
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
