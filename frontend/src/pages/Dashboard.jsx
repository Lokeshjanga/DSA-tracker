import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { Flame, Trophy, CheckCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUOTES = [
  "Every problem you solve is one step closer to the offer. Keep going.",
  "Consistency beats intensity. Show up every day.",
  "The best time to start was yesterday. The second best time is now.",
  "Hard problems today = easy interviews tomorrow.",
  "Your future self will thank you for every problem you solve today.",
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [topics, setTopics] = useState([]);
  const [recentProblems, setRecentProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const quote = QUOTES[new Date().getDay() % QUOTES.length];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileRes, topicsRes, problemsRes] = await Promise.all([
          api.get('/user/profile'),
          api.get('/topics'),
          api.get('/problems')
        ]);
        setStats(profileRes.data);
        setTopics(topicsRes.data);
        setRecentProblems(problemsRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="dashboard-loading">
      <div className="loading-spinner" />
    </div>
  );

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div>
      <div className="dashboard-hero">
        <div>
          <h1 className="dashboard-hero-title">Hey, {firstName}! 👋</h1>
          <p className="dashboard-hero-sub">"{quote}"</p>
        </div>
        {stats?.currentStreak > 0 && (
          <div className="streak-badge-hero">
            <Flame size={20} />
            <span>{stats.currentStreak}-day streak</span>
          </div>
        )}
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card stat-card-primary">
          <div className="stat-icon-wrap stat-icon-primary">
            <CheckCircle size={22} />
          </div>
          <div>
            <div className="card-title">Total Solved</div>
            <div className="card-value">{stats?.totalSolved || 0}</div>
          </div>
        </div>
        <div className="card stat-card stat-card-warning">
          <div className="stat-icon-wrap stat-icon-warning">
            <Flame size={22} />
          </div>
          <div>
            <div className="card-title">Current Streak</div>
            <div className="card-value">{stats?.currentStreak || 0} <span className="card-value-unit">days</span></div>
          </div>
        </div>
        <div className="card stat-card stat-card-success">
          <div className="stat-icon-wrap stat-icon-success">
            <Trophy size={22} />
          </div>
          <div>
            <div className="card-title">Longest Streak</div>
            <div className="card-value">{stats?.longestStreak || 0} <span className="card-value-unit">days</span></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: '700' }}>Topic Progress</h2>
          {topics.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No topics yet. <Link to="/topics" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Add one →</Link></p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {topics.slice(0, 5).map(topic => {
                const percent = topic.totalProblems > 0 ? Math.round((topic.solved / topic.totalProblems) * 100) : 0;
                return (
                  <div key={topic.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: '600' }}>{topic.name}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{topic.solved}/{topic.totalProblems} &nbsp;·&nbsp; <strong style={{ color: 'var(--primary)' }}>{percent}%</strong></span>
                    </div>
                    <div className="progress-container">
                      <div className="progress-bar progress-bar-animated" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Link to="/topics" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', fontSize: '0.875rem' }}>
            View all topics →
          </Link>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: '700' }}>Recent Activity</h2>
          {recentProblems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p>No problems logged yet.</p>
              <Link to="/problems" className="btn btn-primary" style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                Log your first problem →
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentProblems.map(prob => (
                <div key={prob._id} className="activity-row">
                  <div className={`activity-dot difficulty-dot-${prob.difficulty.toLowerCase()}`} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: '500', fontSize: '0.9rem' }}>{prob.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                      {new Date(prob.solvedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {prob.platform && ` · ${prob.platform}`}
                    </p>
                  </div>
                  <span className={`badge badge-${prob.difficulty.toLowerCase()}`}>{prob.difficulty}</span>
                </div>
              ))}
            </div>
          )}
          {recentProblems.length > 0 && (
            <Link to="/problems" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', fontSize: '0.875rem' }}>
              View all problems →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
