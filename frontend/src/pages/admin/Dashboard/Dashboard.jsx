import { useFetch } from '../../../hooks/useFetch';
import { getProjects, getClients, getContacts, getSubscribers } from '../../../api/endpoints';
import Navbar from '../../../components/common/Navbar/Navbar';
import Loader from '../../../components/common/Loader/Loader';
import './Dashboard.css';

const Dashboard = () => {
  const { data: projectsData, loading: projectsLoading } = useFetch(getProjects);
  const { data: clientsData, loading: clientsLoading } = useFetch(getClients);
  const { data: contactsData, loading: contactsLoading } = useFetch(getContacts);
  const { data: subscribersData, loading: subscribersLoading } = useFetch(getSubscribers);

  const loading = projectsLoading || clientsLoading || contactsLoading || subscribersLoading;

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  // Extract arrays from response data - backend returns data in data.projects, data.clients, etc.
  const projects = projectsData?.data?.projects || projectsData?.projects || [];
  const clients = clientsData?.data?.clients || clientsData?.clients || [];
  const contacts = contactsData?.data?.contacts || contactsData?.contacts || [];
  const subscribers = subscribersData?.data?.subscribers || subscribersData?.subscribers || [];

  const stats = [
    {
      title: 'Total Projects',
      value: projects?.length || 0,
      icon: '📊',
      color: 'blue',
    },
    {
      title: 'Total Clients',
      value: clients?.length || 0,
      icon: '👥',
      color: 'green',
    },
    {
      title: 'Contact Messages',
      value: contacts?.length || 0,
      icon: '✉️',
      color: 'purple',
    },
    {
      title: 'Newsletter Subscribers',
      value: subscribers?.length || 0,
      icon: '📧',
      color: 'orange',
    },
  ];

  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="dashboard">
        <div className="container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome to EngageX Admin Panel</p>
          </div>

          <div className="dashboard-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <p className="stat-label">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="dashboard-sections">
            <div className="dashboard-section">
              <h2 className="section-title">Recent Projects ({projects?.length || 0})</h2>
              {projects && projects.length > 0 ? (
                <div className="items-list">
                  {projects.slice(0, 5).map((project) => (
                    <div key={project._id} className="item-row">
                      <div className="item-main">
                        <span className="item-name">{project.title}</span>
                        <span className="item-detail">{project.category || 'General'}</span>
                        {project.technologies && project.technologies.length > 0 && (
                          <span className="item-detail">
                            {project.technologies.slice(0, 3).join(', ')}
                            {project.technologies.length > 3 && '...'}
                          </span>
                        )}
                      </div>
                      <span className={`item-badge badge-${project.status.toLowerCase()}`}>
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">No projects yet</p>
              )}
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">Recent Clients ({clients?.length || 0})</h2>
              {clients && clients.length > 0 ? (
                <div className="items-list">
                  {clients.slice(0, 5).map((client) => (
                    <div key={client._id} className="item-row">
                      <div className="item-main">
                        <span className="item-name">{client.name}</span>
                        <span className="item-detail">
                          {client.position && client.company 
                            ? `${client.position} at ${client.company}`
                            : client.company || client.position || 'No company info'}
                        </span>
                        {client.rating && (
                          <span className="item-detail">
                            {'⭐'.repeat(client.rating)} ({client.rating}/5)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">No clients yet</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
