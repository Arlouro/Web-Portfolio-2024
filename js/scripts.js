// Project Data
const projects = [
    {
        title: "Music Streaming App",
        image: "/api/placeholder/400/400",
        description: "A modern music streaming platform built with focus on user experience and performance.",
        role: "Frontend Developer",
        technologies: ["HTML5", "CSS3", "JavaScript", "React"],
        link: "https://github.com/project1"
    },
    {
        title: "E-commerce Platform",
        image: "/api/placeholder/400/400",
        description: "Full-stack e-commerce solution with real-time inventory management.",
        role: "Backend Developer",
        technologies: ["Node.js", "Express", "MongoDB", "Redis"],
        link: "https://github.com/project2"
    },
    {
        title: "Portfolio Generator",
        image: "/api/placeholder/400/400",
        description: "Dynamic portfolio creation tool for developers.",
        role: "Full Stack Developer",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
        link: "https://github.com/project3"
    }
];

let currentProjectIndex = 0;
let isPlaying = false;

// DOM Elements
const projectsSection = document.getElementById('projects');
const vinyl = document.querySelector('.vinyl');
const needle = document.querySelector('.needle');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    createProjectsContainer();
    updateProjectDisplay();
    setupEventListeners();
});

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = e.target.getAttribute('data-section');
            
            // Update active states
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
            
            navLinks.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

// Create Projects Container
function createProjectsContainer() {
    const projectsContainer = document.createElement('div');
    projectsContainer.className = 'music-player';
    
    projectsContainer.innerHTML = `
        <div class="player-left">
            <div class="album-cover">
                <img id="project-image" src="" alt="Project Preview">
            </div>
            <div class="player-controls">
                <button class="control-btn" id="prevBtn">
                    <i class="fas fa-backward"></i>
                </button>
                <button class="control-btn" id="playBtn">
                    <i class="fas fa-play"></i>
                </button>
                <button class="control-btn" id="nextBtn">
                    <i class="fas fa-forward"></i>
                </button>
            </div>
        </div>
        <div class="player-right">
            <div class="project-info">
                <h3 id="project-title"></h3>
                <p id="project-role"></p>
                <div class="project-description" id="project-description"></div>
                <div class="project-tech" id="project-tech"></div>
                <a href="#" class="project-link" id="project-link" target="_blank">
                    View Project <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;
    
    const projectsSection = document.querySelector('.projects-container');
    projectsSection.appendChild(projectsContainer);
}

// Update Project Display
function updateProjectDisplay() {
    const project = projects[currentProjectIndex];
    
    document.getElementById('project-image').src = project.image;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-role').textContent = project.role;
    document.getElementById('project-description').textContent = project.description;
    document.getElementById('project-link').href = project.link;
    
    // Update technologies
    const techContainer = document.getElementById('project-tech');
    techContainer.innerHTML = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
}

// Setup Event Listeners
function setupEventListeners() {
    // Play Button
    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        vinyl.classList.toggle('playing');
        needle.classList.toggle('playing');
        
        // Update play button icon
        playBtn.innerHTML = isPlaying ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
    });
    
    // Previous Button
    document.getElementById('prevBtn').addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex === 0) ? 
            projects.length - 1 : 
            currentProjectIndex - 1;
        updateProjectDisplay();
    });
    
    // Next Button
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex === projects.length - 1) ? 
            0 : 
            currentProjectIndex + 1;
        updateProjectDisplay();
    });
}