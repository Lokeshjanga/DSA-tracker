import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Flame, BarChart3, Users } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
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
            Your interview prep,<br />
            <span className="auth-hero-accent">supercharged</span>
          </h1>
          <p className="auth-hero-sub">
            Join thousands of engineers who prep smarter — not harder — with structured tracking and streaks.
          </p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <div className="auth-feature-icon"><CheckCircle2 size={18} /></div>
              <span>Log solved problems in seconds</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon"><Flame size={18} /></div>
              <span>Streak system keeps you accountable</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon"><BarChart3 size={18} /></div>
              <span>Topic-level progress at a glance</span>
            </div>
          </div>
          <div className="auth-social-proof">
            <div className="auth-avatars">
              {['S','M','R','K'].map((l, i) => (
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
          <h2 className="auth-title">Create your account</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
            Free forever. No credit card required.
          </p>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Alex Johnson"
              />
            </div>
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
                placeholder="Min. 6 characters"
                minLength="6"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : 'Get Started Free →'}
            </button>
          </form>
          <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
