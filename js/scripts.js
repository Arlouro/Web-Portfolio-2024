const projects = [
    {
        title: "QrkUp Software",
        description: "QrkUp Software is a website developed for a Software Engineering class, designed to streamline the quiz and test creation process for educators. This platform empowers students to contribute by submitting their own questions, which are then reviewed by a panel of three peers before approval and integration into official tests. Additionally, the platform allows students to solve these tests online, providing a comprehensive and efficient solution for both test creation and administration.",
        technologies: ["React", "JavaScript", "HTML", "CSS", "Figma"],
        image: "path/to/image1.jpg", //!!! change path
        //!github: "https://github.com/yourusername/project1",
        //!live: "https://project1-demo.com"
    },
    {
        title: "MuscleUp!",
        description: "MuscleUp! is a software developed during the ShiftAppens 2024 hackathon, designed to revolutionize workout efficiency and minimize injuries. This innovative tool harnesses advanced computer vision and AI algorithms to track the user's movements, accurately count repetitions, and identify potential risks such as excessive loads and suboptimal training plans.",
        technologies: ["Figma", "Adobe Illustrator", "React", "Ruby on Rails"],
        image: "path/to/image2.jpg", //!!! change path
    },
    {
        title: "Googol",
        description: "Googol is a search engine developed for the Distributed Systems class. This project involved creating a responsive search engine capable of indexing links and searching for terms, words, and links within the indexed content. It also allows managing performance metrics such as active barrels and top searches. The search results display links with brief descriptions and provide quick definitions of searched words or terms using a generative AI API.",
        technologies: ["Javascript", "Java", "Springboot", "HTML", "Rest API", "HTML", "CSS"],
        image: "path/to/image3.jpg", //!!! change path
    },
    {
        title: "Badge Master",
        description: "Badge Master is a conceptual software developed for the Management and Innovation Processes class, aimed at solving the challenges of credentialization and access granting at large events. For this project, I independently designed the interface in under a week to ensure a functional mockup was ready for the presentation. The design needed to be simple and easy to use, while also meeting the specific requirements imposed by the target users.",
        technologies: ["Javascript", "React", "HTML", "CSS", "Figma"],
        image: "path/to/image4.jpg", //!!! change path
    },
];

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    card.innerHTML = `
        <div class="project-vinyl">
            <div class="project-vinyl-label">
                <h3>${project.title}</h3>
            </div>
        </div>
        <div class="project-content">
            <p>${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">|${tech}|</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" rel="noopener">
                    <i class="fab fa-github"></i> Code
                </a>
                <a href="${project.live}" target="_blank" rel="noopener">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;

    // Add hover animation
    card.addEventListener('mouseenter', () => {
        card.querySelector('.project-vinyl').style.animation = 'spin 2s linear infinite';
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('.project-vinyl').style.animation = 'spin-stop 0.5s linear forwards';
    });

    return card;
}

function loadProjects() {
    const projectGrid = document.getElementById('project-grid');

    projects.forEach(project => {
        const card = createProjectCard(project);
        projectGrid.appendChild(card);
        // Add fade-in animation
        card.style.animation = 'fadeIn 0.5s ease-out forwards';
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize animations for vinyl elements
function initVinylAnimations() {
    const tonearm = document.querySelector('.tonearm');
    const vinyl = document.querySelector('.vinyl');

    vinyl.addEventListener('click', () => {
        tonearm.classList.add('playing');
        vinyl.style.animation = 'rotate 20s linear infinite';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initVinylAnimations();

    // Add scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});