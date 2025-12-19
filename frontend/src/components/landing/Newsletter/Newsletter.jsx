import { useState } from 'react';
import { subscribeNewsletter } from '../../../api/endpoints';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await subscribeNewsletter(email);
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to subscribe to newsletter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
          <p className="newsletter-description">
            Stay updated with our latest projects, insights, and industry news
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="newsletter-input-group">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {success && (
              <div className="alert alert-success">
                Successfully subscribed to our newsletter!
              </div>
            )}
            
            {error && <div className="alert alert-error">{error}</div>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
