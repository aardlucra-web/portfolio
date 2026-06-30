// data.js
// ALL my content lives here
// if i want to update anything on the site, only touch this file
// main.js reads this and builds the page automatically

const siteData = {

  // ---- HERO ----
  // the big card in the middle
  hero: {
    name: "hi, i'm adrianne",
    subtitle: "cs student · developer · builder of things",
    avatar: null,       // set this to "images/me.jpg" if i get a photo
    avatarEmoji: "🧑‍💻", // fallback if no photo
  },

  // ---- ABOUT ----
  about: {
    fullName: "Adrianne Ramos",
    location: "Melbourne, AU",
    school: "SAE University College",
    bio: "Backend-leaning CS student with a love for Python, clean code, and building things people actually enjoy using. Currently in my second trimester at SAE Australia, working through web dev, scripting, data structures, and more.",
    // add or remove interests freely
    interests: [
      "Hearthstone",
      "League of Legends",
      "Minecraft modding",
      "ORV / manhwa",
      "Linux ricing",
      "ASOIAF",
    ],
  },

  // ---- SKILLS ----
  // value = 0-100, shows as a % bar
  skills: {
    hard: [
      { name: "Python / backend", value: 85 },
      { name: "HTML / CSS / JS",  value: 70 },
      { name: "C# / OOP",         value: 55 },
      { name: "Data Structures",  value: 60 },
      { name: "Scripting / Bash", value: 50 },
    ],
    soft: [
      "Self-directed learning",
      "Problem-solving under ambiguity",
      "Working independently",
    ],
  },

  // ---- PROJECTS ----
  // to add a new project, copy one of these objects and fill it in
  projects: [
    {
      title: "Portfolio Site",
      description: "This very site — data-driven panels, dark mode, fully responsive. Built for CST150.",
      tags: ["HTML", "CSS", "JS"],
      link: "https://aardlucra-web.github.io/portfolio/",
      linkLabel: "view live",
    },
    {
      title: "Weather Widget",
      description: "Melbourne 7-day min/max forecast pulled from the Open-Meteo API, displayed as a clean table.",
      tags: ["HTML", "JS", "API"],
      link: "https://github.com/aardlucra-web",
      linkLabel: "view repo",
    },
    {
      title: "TaskMate",
      description: "Agile student task reminder web app. Group project — i was Scrum Master across 4 sprints.",
      tags: ["Agile", "HTML", "JS"],
      link: "https://github.com/aardlucra-web",
      linkLabel: "view repo",
    },
    {
      title: "Book Tracker",
      description: "Python CLI app using two classes (Book, Library), pipe-delimited file I/O, and a menu-driven interface.",
      tags: ["Python", "OOP", "CLI"],
      link: "https://github.com/aardlucra-web",
      linkLabel: "view repo",
    },
  ],

  // ---- CONTACT ----
  contact: {
    email: "brentramos741@gmail.com",
    // to add more socials later, copy one of these objects
    socials: [
      {
        label: "GitHub",
        url: "https://github.com/aardlucra-web",
        icon: "github", // matches a key in the icons object in main.js
      },
      // {
      //   label: "LinkedIn",
      //   url: "https://linkedin.com/in/yourname",
      //   icon: "linkedin",
      // },
    ],
  },

};
