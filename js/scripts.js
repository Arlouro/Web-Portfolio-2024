const projects = [
    {
        title: "QrkUp Software",
        image: "./assets/images/qrkup-software.png",
        description: "QrkUp Software is a website developed for a Software Engineering class, designed to streamline the quiz and test creation process for educators. This platform empowers students to contribute by submitting their own questions, which are then reviewed by a panel of three peers before approval and integration into official tests. Additionally, the platform allows students to solve these tests online, providing a comprehensive and efficient solution for both test creation and administration.",
        role: "Team Lead & UX/UI Designer & Frontend Developer",
        technologies: ["HTML5", "CSS", "JavaScript", "React", "Figma"],
        status: "Finished",
        link: "https://github.com/project1"
    },
    {
        title: "MuscleUp!",
        image: "./assets/images/muscleup.png",
        description: "MuscleUp! is a software developed during the ShiftAppens 2024 hackathon, designed to revolutionize workout efficiency and minimize injuries. This innovative tool harnesses advanced computer vision and AI algorithms to track the user's movements, accurately count repetitions, and identify potential risks such as excessive loads and suboptimal training plans.",
        role: "UX/UI Designer",
        technologies: ["Figma", "Adobe XD", "React", "Ruby on Rails"],
        status: "Finished",
        link: "https://github.com/project2"
    },
    {
        title: "Googol",
        image: "./assets/images/googol-software.png",
        description: "Googol is a search engine developed for the Distributed Systems class. This project involved creating a responsive search engine capable of indexing links and searching for terms, words, and links within the indexed content. It also allows managing performance metrics such as active barrels and top searches. The search results display links with brief descriptions and provide quick definitions of searched words or terms using a generative AI API.",
        role: "Full Stack Developer & UX/UI Designer",
        technologies: ["JavaScript", "Java", "SpringBoot", "RestAPI", "HTML5", "CSS"],
        status: "Finished",
        link: "https://github.com/project3"
    },
    {
        title: "./assets/images/badge-master.png",
        image: "/api/placeholder/400/400",
        description: "Badge Master is a conceptual software developed for the Management and Innovation Processes class, aimed at solving the challenges of credentialization and access granting at large events. For this project, I independently designed the interface in under a week to ensure a functional mockup was ready for the presentation. The design needed to be simple and easy to use, while also meeting the specific requirements imposed by the target users.",
        role: "UX/UI Designer",
        technologies: ["React", "JavaScript", "HTML5", "CSS", "Figma"],
        status: "Finished",
        link: ""
    },
    {
        title: "Canoe Manager",
        image: "./assets/images/canoe-manager.png",
        description: "Canoe Manager is a software developed for the Software Engineering class, designed to streamline the process of managing canoe trips and rentals. This platform allows users to browse available canoes, check availability, and reserve canoes for specific dates. It also provides a comprehensive overview of the available canoes, their specifications, and the current status of each canoe.",
        role: "UX/UI Designer & Frontend Developer",
        technologies: ["React", "JavaScript", "NextJS","HTML5", "CSS", "Figma"],
        status: "In Progress",
        link: ""
    }
];

let currentProjectIndex = 0;
let isPlaying = false;

const projectsSection = document.getElementById('projects');
const vinyl = document.querySelector('.vinyl');
const needle = document.querySelector('.needle');

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    createProjectsContainer();
    updateProjectDisplay();
    setupEventListeners();
});

// Navigation Functionality ############################################
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

// Project Display Functionality ############################################
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

function updateProjectDisplay() {
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

// Vinyl Player Functionality ############################################
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

// Quotes Functionality ############################################
const QUOTES_API = 'https://api.quotable.io/random';

const fallbackQuotes = [
    {
        content: "Design is not just what it looks like and feels like. Design is how it works.",
        author: "Steve Jobs"
    },
    {
        content: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci"
    }
];

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
}

async function fetchQuote(retries = 3) {
    try {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(QUOTES_API);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return {
                    quote: data.content,
                    author: data.author
                };
            } catch (error) {
                console.warn(`Attempt ${i + 1} failed:`, error);
                if (i === retries - 1) {
                    const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
                    return {
                        quote: randomFallback.content,
                        author: randomFallback.author
                    };
                }
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        return {
            quote: randomFallback.content,
            author: randomFallback.author
        };
    }
}

function displayQuote(quoteData) {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('quote-author');
    
    if (!quoteElement || !authorElement) return;

    quoteElement.classList.add('fade-out');
    authorElement.classList.add('fade-out');

    setTimeout(() => {
        quoteElement.textContent = `"${quoteData.quote}"`;
        authorElement.textContent = `- ${quoteData.author}`;
        
        quoteElement.classList.remove('fade-out');
        authorElement.classList.remove('fade-out');
        quoteElement.classList.add('fade-in');
        authorElement.classList.add('fade-in');
    }, 300);
}

document.addEventListener('DOMContentLoaded', async () => {
    initializeQuotes();
    
    const quoteData = await fetchQuote();
    displayQuote(quoteData);

    const refreshButton = document.getElementById('refresh-quote');
    if (refreshButton) {
        refreshButton.addEventListener('click', async () => {
            refreshButton.classList.add('rotating');
            const newQuote = await fetchQuote();
            displayQuote(newQuote);
            setTimeout(() => {
                refreshButton.classList.remove('rotating');
            }, 1000);
        });
    }
});

// Event Listeners ############################################
function setupEventListeners() {
    // Project Navigation -----------------------------------
    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        vinyl.classList.toggle('playing');
        needle.classList.toggle('playing');
        
        playBtn.innerHTML = isPlaying ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex === 0) ? 
            projects.length - 1 : 
            currentProjectIndex - 1;
        updateProjectDisplay();
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex === projects.length - 1) ? 
            0 : 
            currentProjectIndex + 1;
        updateProjectDisplay();
    });

    // Vinyl Player -----------------------------------
    vinyl.addEventListener('click', togglePlay);
    needle.addEventListener('click', togglePlay);

    const vinylContainer = document.querySelector('.vinyl-container');
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

    // Hamburger Menu -----------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navRight.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navRight.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navRight.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navRight.classList.remove('active');
        }
    });
}