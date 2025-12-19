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
          <h2 className="newsletter-title">Stay in the loop</h2>
          <p className="newsletter-description">
            Get updates on new projects and insights delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {success && (
            <div className="alert alert-success">
              You're subscribed! Thanks for joining.
            </div>
          )}
          
          {error && <div className="alert alert-error">{error}</div>}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
