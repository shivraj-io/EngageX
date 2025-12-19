import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logoutUser();
    navigate('/admin/login');
  };

  if (isAdminRoute && location.pathname !== '/admin/login') {
    return (
      <nav className="navbar navbar-admin">
        <div className="container">
          <div className="navbar-content">
            <Link to="/admin/dashboard" className="navbar-brand">
              EngageX Admin
            </Link>
            <div className="navbar-menu">
              <Link
                to="/admin/dashboard"
                className={`navbar-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/projects"
                className={`navbar-link ${location.pathname === '/admin/projects' ? 'active' : ''}`}
              >
                Projects
              </Link>
              <Link
                to="/admin/clients"
                className={`navbar-link ${location.pathname === '/admin/clients' ? 'active' : ''}`}
              >
                Clients
              </Link>
              <Link
                to="/admin/contacts"
                className={`navbar-link ${location.pathname === '/admin/contacts' ? 'active' : ''}`}
              >
                Contacts
              </Link>
              <Link
                to="/admin/subscribers"
                className={`navbar-link ${location.pathname === '/admin/subscribers' ? 'active' : ''}`}
              >
                Subscribers
              </Link>
              {user && (
                <button onClick={handleLogout} className="btn btn-outline navbar-logout">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            EngageX
          </Link>
          <div className="navbar-menu">
            <a href="#projects" className="navbar-link">
              Projects
            </a>
            <a href="#clients" className="navbar-link">
              Clients
            </a>
            <a href="#contact" className="navbar-link">
              Contact
            </a>
            <Link to="/admin/login" className="btn btn-primary">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
