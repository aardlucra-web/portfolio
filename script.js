// =====================
// DARK MODE TOGGLE
// =====================

const toggleBtn = document.querySelector('#theme-toggle');

toggleBtn.addEventListener('click', function() {
  // adds or removes the "dark" class on body
  document.body.classList.toggle('dark');

  // swap the button emoji to match current mode
  if (document.body.classList.contains('dark')) {
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }
});

// =====================
// SKILLS — data-driven
// =====================

// your skills live here as data, not hardcoded in HTML
const skills = [
  'HTML', 'CSS', 'JavaScript',
  'Python', 'C#', 'Agile / Scrum',
  'Git', 'Responsive Design', 'Linux'
];

// grab the empty container from the HTML
const skillsContainer = document.querySelector('#skills-container');

// loop through each skill and create a tag element for it
skills.forEach(function(skill) {
  const tag = document.createElement('span');
  tag.classList.add('skill-tag');
  tag.textContent = skill;
  skillsContainer.appendChild(tag);
});

// =====================
// PROJECTS — data-driven
// =====================

const projects = [
  {
    title: 'Book Tracker',
    description: 'Python OOP app with file I/O and a menu-driven CLI. Built for CST182.'
  },
  {
    title: 'Pixel & Dice Inventory System',
    description: 'No-code inventory management system built in Airtable. Built for CST170.'
  },
  {
    title: 'TaskMate',
    description: 'Student task reminder web app built with an Agile team over four sprints. CST190.'
  }
];

const projectsContainer = document.querySelector('#projects-container');

projects.forEach(function(project) {
  // create the card div
  const card = document.createElement('div');
  card.classList.add('project-card');

  // build the inner HTML of the card
  card.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
  `;

  projectsContainer.appendChild(card);
});
