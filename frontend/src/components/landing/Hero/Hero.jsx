import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Business with
            <span className="hero-highlight"> Projectora</span>
          </h1>
          <p className="hero-description">
            A comprehensive platform for managing projects and clients efficiently.
            Streamline your workflow, track progress, and deliver exceptional results.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary btn-large">
              Get Started
            </a>
            <a href="#projects" className="btn btn-outline btn-large">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
