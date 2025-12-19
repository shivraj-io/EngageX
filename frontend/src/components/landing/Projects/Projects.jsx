import { useFetch } from '../../../hooks/useFetch';
import { getProjects } from '../../../api/endpoints';
import ProjectCard from '../ProjectCard/ProjectCard';
import Loader from '../../common/Loader/Loader';
import './Projects.css';

const Projects = () => {
  const { data: projects, loading, error } = useFetch(getProjects);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className="projects" id="projects">
        <div className="container">
          <div className="alert alert-error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Projects</h2>
          <p className="section-description">
            Explore our portfolio of successful projects delivered to clients worldwide
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="empty-message">No projects available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
