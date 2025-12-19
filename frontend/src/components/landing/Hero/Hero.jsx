import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Project & Client Management Made Simple
          </div>
          <h1 className="hero-title">
            Manage projects and clients{' '}
            <span className="hero-title-highlight">all in one place</span>
          </h1>
          <p className="hero-description">
            EngageX helps teams organize projects, track progress, and build stronger client relationships. Simple, effective, and designed for real work.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary btn-lg">
              Get Started Free
            </a>
            <a href="#projects" className="btn btn-outline btn-lg">
              View Our Work
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">50+</div>
              <div className="hero-stat-label">Projects Delivered</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">30+</div>
              <div className="hero-stat-label">Happy Clients</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">99%</div>
              <div className="hero-stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
