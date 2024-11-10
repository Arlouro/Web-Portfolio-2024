// Global state
let projects = [];
let quotes = [];
let currentProjectIndex = 0;
let isPlaying = false;

// DOM Elements
const vinyl = document.querySelector('.vinyl');
const needle = document.querySelector('.needle');

// Fallback data
const fallbackProjects = {
    projects: [
        {
            title: "QrkUp Software",
            image: "./assets/images/qrkup-software.png",
            description: "QrkUp Software is a website developed for a Software Engineering class...",
            role: "Team Lead & UX/UI Designer & Frontend Developer",
            technologies: ["HTML5", "CSS", "JavaScript", "React", "Figma"],
            status: "Finished",
            link: "https://github.com/project1"
        }
    ]
};

const fallbackQuotes = {
    quotes: [
        {
            content: "Design is not just what it looks like and feels like. Design is how it works.",
            author: "Steve Jobs"
        }
    ]
};

async function fetchWithFallback(url, fallbackData) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error loading data from ${url}:`, error);
        return fallbackData;
    }
}

// Data initialization ##################################
async function initializeData() {
    try {
        const [projectsData, quotesData] = await Promise.all([
            fetchWithFallback('./data/projects.json', fallbackProjects),
            fetchWithFallback('./data/quotes.json', fallbackQuotes)
        ]);

        projects = projectsData.projects;
        quotes = quotesData.quotes;

        updateProjectDisplay();
        initializeQuotes();
    } catch (error) {
        console.error('Failed to initialize application:', error);
        projects = fallbackProjects.projects;
        quotes = fallbackQuotes.quotes;
    }
}

// Navigation ##################################
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navRight = document.querySelector('.nav-right');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = e.target.getAttribute('data-section');
            
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
            
            navLinks.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
            
            hamburger.classList.remove('active');
            navRight.classList.remove('active');
        });
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navRight.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navRight.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navRight.classList.remove('active');
        }
    });
}

// Projects Functionality ##################################
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
    
    document.querySelector('.projects-container').appendChild(projectsContainer);
    setupProjectControls();
}

function setupProjectControls() {
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        vinyl.classList.toggle('playing');
        needle.classList.toggle('playing');
        playBtn.innerHTML = isPlaying ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
    });

    prevBtn.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex === 0) ? 
            projects.length - 1 : 
            currentProjectIndex - 1;
        updateProjectDisplay();
    });

    nextBtn.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex === projects.length - 1) ? 
            0 : 
            currentProjectIndex + 1;
        updateProjectDisplay();
    });
}

function updateProjectDisplay() {
    if (!projects.length) return;
    
    const project = projects[currentProjectIndex];
    
    document.getElementById('project-image').src = project.image;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-role').textContent = project.role;
    document.getElementById('project-description').textContent = project.description;
    document.getElementById('project-link').href = project.link;
    
    const techContainer = document.getElementById('project-tech');
    techContainer.innerHTML = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
}

// Vinyl Player Functionality ##################################
function setupVinylPlayer() {
    const vinylContainer = document.querySelector('.vinyl-container');

    vinyl.addEventListener('click', togglePlay);
    needle.addEventListener('click', togglePlay);

    vinylContainer.addEventListener('mouseenter', () => {
        if (!isPlaying) {
            needle.style.transform = 'rotate(35deg)';
        }
    });

    vinylContainer.addEventListener('mouseleave', () => {
        if (!isPlaying) {
            needle.style.transform = 'rotate(0deg)';
        }
    });
}

function togglePlay(event) {
    event.stopPropagation();
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        vinyl.classList.add('playing');
        needle.classList.add('playing');
    } else {
        vinyl.classList.remove('playing');
        needle.classList.remove('playing');
        
        const stopTransition = () => {
            vinyl.style.transform = 'rotate(0deg)';
            vinyl.removeEventListener('animationiteration', stopTransition);
        };
        vinyl.addEventListener('animationiteration', stopTransition);
    }
}

// Quotes Functionality ##################################
function initializeQuotes() {
    const quotesContainer = document.querySelector('.quotes-container');
    if (!quotesContainer) return;
    
    quotesContainer.innerHTML = `
        <div class="quote-wrapper">
            <p id="quote" class="quote"></p>
            <p id="quote-author" class="quote-author"></p>
        </div>
        <button id="refresh-quote" class="control-btn">
            <i class="fas fa-sync-alt"></i>
        </button>
    `;

    displayRandomQuote();
    setupQuoteRefresh();
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayRandomQuote() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('quote-author');
    
    if (!quoteElement || !authorElement) return;

    const { content, author } = getRandomQuote();

    quoteElement.classList.add('fade-out');
    authorElement.classList.add('fade-out');

    setTimeout(() => {
        quoteElement.textContent = `"${content}"`;
        authorElement.textContent = `- ${author}`;
        
        quoteElement.classList.remove('fade-out');
        authorElement.classList.remove('fade-out');
        quoteElement.classList.add('fade-in');
        authorElement.classList.add('fade-in');
    }, 300);
}

function setupQuoteRefresh() {
    const refreshButton = document.getElementById('refresh-quote');
    if (!refreshButton) return;
    
    refreshButton.addEventListener('click', (e) => {
        e.preventDefault();
        refreshButton.classList.add('rotating');
        displayRandomQuote();
        setTimeout(() => {
            refreshButton.classList.remove('rotating');
        }, 1000);
    });
}

// Initialize application ##################################
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    createProjectsContainer();
    setupVinylPlayer();
    initializeData();
});