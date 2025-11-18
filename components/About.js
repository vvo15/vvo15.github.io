export default function renderAbout(about) {
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
