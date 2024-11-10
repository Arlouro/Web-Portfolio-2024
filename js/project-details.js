document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectIndex = urlParams.get('index');

  try {
      const response = await fetch('./data/projects.json');
      if (!response.ok) {
          throw new Error('Failed to fetch project data');
      }
      const projectsData = await response.json();
      const projects = projectsData.projects;

      if (projectIndex !== null && projects) {
          const project = projects[projectIndex];

          document.getElementById('project-title').textContent = project.title;
          document.getElementById('project-image').src = project.image;
          document.getElementById('project-description').textContent = project.description;
          document.getElementById('project-role').textContent = project.role;

          const techContainer = document.getElementById('project-tech');
          techContainer.innerHTML = project.technologies.map(tech => 
              `<span class="tech-tag">${tech}</span>`
          ).join('');

          const galleryContainer = document.getElementById('project-gallery');
          galleryContainer.innerHTML = project.gallery.map(image => 
              `<img src="${image.url}" alt="${image.caption}">`
          ).join('');
      } else {
          console.error('Project index not found in URL or projects not available');
      }
  } catch (error) {
      console.error('Error fetching project data:', error);
  }
});