import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <article className="project-card">
      <div className="project-card-header">
        <h3 className="project-card-title">{project.title}</h3>
        <span className={`project-card-status status-${project.status.toLowerCase()}`}>
          {project.status}
        </span>
      </div>
      <p className="project-card-description">{project.description}</p>
      <div className="project-card-meta">
        <div className="project-card-meta-item">
          <span className="meta-label">Client:</span>
          <span className="meta-value">{project.client}</span>
        </div>
        <div className="project-card-meta-item">
          <span className="meta-label">Technology:</span>
          <span className="meta-value">{project.technology}</span>
        </div>
        {project.completionDate && (
          <div className="project-card-meta-item">
            <span className="meta-label">Completed:</span>
            <span className="meta-value">
              {new Date(project.completionDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
