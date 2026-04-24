import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Target, TrendingUp, Users } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      <div className="auth-marketing-panel">
        <div className="auth-marketing-content">
          <div className="auth-brand">
            <div className="auth-brand-icon">⚡</div>
            <span className="auth-brand-name">TrackIt</span>
          </div>
          <h1 className="auth-hero-title">
            Ace your next<br />
            <span className="auth-hero-accent">tech interview</span>
          </h1>
          <p className="auth-hero-sub">
            Track every problem you solve, build unstoppable streaks, and land your dream job.
          </p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <div className="auth-feature-icon"><Target size={18} /></div>
              <span>Track problems by topic & difficulty</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon"><Zap size={18} /></div>
              <span>Build daily streaks to stay consistent</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon"><TrendingUp size={18} /></div>
              <span>Visualize your progress over time</span>
            </div>
          </div>
          <div className="auth-social-proof">
            <div className="auth-avatars">
              {['A','B','C','D'].map((l, i) => (
                <div key={i} className="auth-avatar-bubble" style={{ zIndex: 4 - i, marginLeft: i > 0 ? '-10px' : '0' }}>
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div className="auth-proof-count">
                <Users size={14} style={{ display: 'inline', marginRight: '4px' }} />
                <strong>2,400+</strong> engineers preparing daily
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-card">
          <h2 className="auth-title">Welcome back 👋</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
            Sign in to continue your prep journey
          </p>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : 'Sign In'}
            </button>
          </form>
          <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
              Create one free →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
