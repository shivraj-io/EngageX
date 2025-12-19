import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <article className="project-card">
      {project.imageUrl && (
        <div className="project-card-image">
          <img src={project.imageUrl} alt={project.title} />
          {project.featured && <span className="featured-badge">Featured</span>}
        </div>
      )}
      
      <div className="project-card-content">
        <div className="project-card-header">
          <h3 className="project-card-title">{project.title}</h3>
          {project.category && (
            <span className="project-category">{project.category}</span>
          )}
        </div>
        
        <p className="project-card-description">{project.description}</p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-technologies">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-badge">{tech}</span>
            ))}
          </div>
        )}
        
        <div className="project-card-links">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              🔗 Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              💻 GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
