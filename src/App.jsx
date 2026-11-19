import React, { useEffect, useState } from "react";

const roles = [
  "Computer Science Engineering graduate",
  "MBA student",
  "AI and machine learning enthusiast",
];

const navItems = [
  ["About", "about"],
  ["Education", "education"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Certifications", "certifications"],
  ["Contact", "contact"],
];

const strengths = [
  "Problem solving",
  "Quick learner",
  "Analytical thinking",
  "Time management",
  "Communication",
  "Teamwork",
];

const projects = [
  {
    icon: "🎙️",
    title: "AI voice assistant",
    description:
      "A desktop assistant that understands voice or text commands to open applications, search the web and manage files, helping users get more done.",
  },
  {
    icon: "☕",
    title: "Coffee shop chatbot",
    description:
      "A chatbot that handles customer queries and order placement, built with Python and AI-based conversational logic.",
  },
  {
    icon: "🧾",
    title: "Billing system",
    description:
      "Billing software that automates bill generation and calculations, using Python and file handling to manage item details, prices and totals.",
  },
  {
    icon: "💍",
    title: "OXERA",
    subtitle: "Brand Development & Marketing Strategy",
    description:
      "Oxera is a conceptual oxidised jewellery brand developed to bring together traditional aesthetics and modern fashion. The brand focuses on offering affordable, stylish, and distinctive jewellery designs for young women who want to express their individuality.",
    profitMargin: "50.9%",
  },
];

const certifications = [
  {
    title: "Agentic AI",
    image: "/certificates/agentic-ai-certificate.pdf",
    alt: "Agentic AI certificate",
  },
  {
    title: "Learning AI for Business Analysis",
    image: "/certificates/learning-ai-for-business-analysis.pdf",
    alt: "Learning AI for Business Analysis certificate",
  },
  {
    title: "Advanced Excel for Financial Planning and Analysis (FP&A)",
    image: "/certificates/advanced-excel-fpa.pdf",
    alt: "Advanced Excel for Financial Planning and Analysis certificate",
  },
];

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event) => setReducedMotion(event.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

function App() {
  const reducedMotion = useReducedMotion();
  const [typedRole, setTypedRole] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setTypedRole(roles[0]);
      return undefined;
    }

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeout;

    const type = () => {
      const currentRole = roles[roleIndex];
      if (!deleting) {
        characterIndex += 1;
        setTypedRole(currentRole.slice(0, characterIndex));
        if (characterIndex === currentRole.length) {
          deleting = true;
          timeout = window.setTimeout(type, 1600);
        } else {
          timeout = window.setTimeout(type, 55);
        }
      } else if (characterIndex > 0) {
        characterIndex -= 1;
        setTypedRole(currentRole.slice(0, characterIndex));
        timeout = window.setTimeout(type, 28);
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = window.setTimeout(type, 300);
      }
    };

    timeout = window.setTimeout(type, 1000);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    document.querySelectorAll(".rv").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document
      .querySelectorAll("section[id]")
      .forEach((section) => sectionObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = isDark ? "light" : "dark";
  };

  const handleCardMouseMove = (event) => {
    if (reducedMotion) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };

  return (
    <>
      <nav>
        <div className="wrap">
          <a className="logo" href="#top">RPK</a>
          <div className={`links${menuOpen ? " open" : ""}`} id="primary-navigation">
            {navItems.map(([label, id]) => (
              <a
                className={activeSection === id ? "on" : ""}
                href={`#${id}`}
                key={id}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <button id="theme" aria-label="Toggle light or dark theme" onClick={toggleTheme}>
            ◐
          </button>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="wrap">
          <p className="hi">Hi, I’m</p>
          <h1 aria-label="Ravneet Pal Kaur">
            <span className="ln">
              {Array.from("Ravneet Pal Kaur").map((character, index) => (
                <span
                  aria-hidden="true"
                  className="ch"
                  key={index}
                  style={{ "--i": index }}
                >
                  {character === " " ? "\u00a0" : character}
                </span>
              ))}
            </span>
          </h1>
          <div className="role">
            <span id="typed">{typedRole}</span>
            <span className="caret" />
          </div>
          <p className="tag">
            A passionate learner with a technical foundation in computer science and a growing
            understanding of business and management.
          </p>
          <div className="btns">
            <a className="btn p" href="#contact">Get in touch</a>
            <a className="btn s" href="#projects">See my projects</a>
            <a
              className="btn s"
              href="/RavneetPal-Kaur-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View resume
            </a>
          </div>
        </div>
      </header>

      <section id="about">
        <div className="wrap">
          <h2 className="h2 rv">About me</h2>
          <div className="about">
            <div className="about-photo rv">
              <img src="/images/ravneet-portrait.jpeg" alt="Ravneet Pal Kaur" />
            </div>
            <div className="rv">
              <p>
                I’m a Computer Science Engineering graduate with an interest in technology,
                problem-solving and continuous learning.
              </p>
              <p>
                My graduation gave me a technical foundation and an understanding of computer
                systems, programming and logical thinking.
              </p>
              <p>
                I’m now pursuing my MBA at Lovely Professional University, expanding my knowledge
                of business management and organisational practices.
              </p>
              <p>I believe in continuous improvement, adaptability and learning through new experiences.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="education" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <h2 className="h2 rv">Education</h2>
          <div className="tl rv">
            <div className="item">
              <h3>Master of Business Administration (MBA)</h3>
              <p className="meta">Lovely Professional University</p>
              <p className="when">2026 – present</p>
            </div>
            <div className="item">
              <h3>Bachelor of Technology, Computer Science Engineering</h3>
              <p className="meta">Punjabi University, Patiala</p>
              <p className="when">2022 – 2026 · CGPA 8.79/10</p>
            </div>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="wrap">
          <h2 className="h2 rv">Experience</h2>
          <div className="tl rv">
            <div className="item">
              <h3>Artificial Intelligence Intern</h3>
              <p className="meta">Ziion Technology, Mohali</p>
              <p className="when">Jan 2026 – Jun 2026</p>
              <ul>
                <li>Worked on AI concepts, tools and practical applications.</li>
                <li>Assisted with AI model development, data preprocessing and implementing machine learning solutions.</li>
                <li>Strengthened problem-solving, teamwork and presentation skills through collaborative project work.</li>
              </ul>
            </div>
            <div className="item">
              <h3>Artificial Intelligence Intern</h3>
              <p className="meta">Future Finders, Mohali</p>
              <p className="when">Jun 2024 – Jul 2024</p>
              <ul>
                <li>Worked on AI and machine learning projects using Python, NumPy, Pandas and Scikit-learn.</li>
                <li>Performed data preprocessing, model training and evaluation for machine learning applications.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="wrap">
          <h2 className="h2 rv">Skills</h2>
          <div className="skills">
            <div className="chips rv">
              {strengths.map((strength, index) => (
                <span className="chip fl" key={strength} style={{ "--i": index }}>
                  {strength}
                </span>
              ))}
            </div>
            <div className="rv">
              <div className="grp"><h3>Programming</h3><p>Python, C, C++</p></div>
              <div className="grp"><h3>Core concepts</h3><p>Object-oriented programming, data structures and algorithms</p></div>
              <div className="grp"><h3>Web</h3><p>HTML, CSS, basic web development</p></div>
              <div className="grp"><h3>Databases</h3><p>SQL, data handling, query optimisation</p></div>
              <div className="grp"><h3>Artificial intelligence</h3><p>Machine learning, data preprocessing, model evaluation, NumPy, Pandas</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <h2 className="h2 rv">Projects</h2>
          <div className="cards">
            {projects.map(({ icon, title, subtitle, description, profitMargin }) => (
              <article
                className="card rv"
                key={title}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={(event) => { event.currentTarget.style.transform = ""; }}
              >
                <span className="ic">{icon}</span>
                <h3>{title}</h3>
                {subtitle && <p className="project-subtitle">{subtitle}</p>}
                <p>{description}</p>
                {profitMargin && (
                  <p className="project-metric">
                    Profit margin: <strong>{profitMargin}</strong>
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications">
        <div className="wrap">
          <h2 className="h2 rv">Certifications</h2>
          <div className="certificates">
            {certifications.map(({ title, image, alt }) => (
              <article className="certificate rv" key={title}>
                <a className="certificate-preview" href={image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} certificate`}>
                  <iframe src={image} title={alt} />
                </a>
                <div className="certificate-caption">
                  <h3>{title}</h3>
                  <a href={image} target="_blank" rel="noopener noreferrer">View certificate ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ paddingTop: 0 }}>
        <div className="contact">
          <h2 className="h2 in">Let’s connect</h2>
          <p>Open to internships, projects and conversations about AI, technology and business.</p>
          <div className="btns" style={{ justifyContent: "center", opacity: 1, animation: "none" }}>
            <a className="btn p" href="mailto:ravneetkour900@gmail.com">ravneetkour900@gmail.com</a>
            <a
              className="btn s"
              href="https://www.linkedin.com/in/ravneet-pal-kaur-622340321/"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer>© 2026 Ravneet Pal Kaur</footer>
    </>
  );
}

export default App;
