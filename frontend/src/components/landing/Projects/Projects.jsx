import { useFetch } from '../../../hooks/useFetch';
import { getProjects } from '../../../api/endpoints';
import ProjectCard from '../ProjectCard/ProjectCard';
import Loader from '../../common/Loader/Loader';
import './Projects.css';

const Projects = () => {
  const { data: projectsData, loading, error } = useFetch(getProjects);

  console.log('Projects Data:', projectsData);
  console.log('Projects Loading:', loading);
  console.log('Projects Error:', error);

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

  // Extract projects array from response - backend returns data in data.projects
  const projectsArray = projectsData?.data?.projects || projectsData?.projects || [];
  // Ensure it's an array before filtering
  const projects = Array.isArray(projectsArray) ? projectsArray : [];
  // Filter only active projects for public display
  const activeProjects = projects.filter(p => p.status === 'active');

  console.log('Active Projects:', activeProjects);

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Real work we've delivered for our clients
          </p>
        </div>

        {activeProjects && activeProjects.length > 0 ? (
          <div className="projects-grid">
            {activeProjects.map((project) => (
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
