import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import Hero from '../../components/landing/Hero/Hero';
import Projects from '../../components/landing/Projects/Projects';
import Clients from '../../components/landing/Clients/Clients';
import ContactForm from '../../components/landing/ContactForm/ContactForm';
import Newsletter from '../../components/landing/Newsletter/Newsletter';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Clients />
        <ContactForm />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
