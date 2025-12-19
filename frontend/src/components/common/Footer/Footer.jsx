import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">EngageX</div>
            <p className="footer-description">
              Simple and effective project and client management for teams that care about results.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#clients">Clients</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:hello@engagex.com">hello@engagex.com</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {currentYear} EngageX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
