import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/endpoints';
import { useAuth } from '../../../hooks/useAuth';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(credentials);
      console.log('Login response:', response);
      console.log('Response data:', response.data);
      
      // Backend returns data inside a 'data' property
      const { token, admin } = response.data.data;
      console.log('Token:', token);
      console.log('Admin:', admin);
      loginUser(admin, token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">EngageX</div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your admin account</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="admin@engagex.com"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <a href="/">← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
