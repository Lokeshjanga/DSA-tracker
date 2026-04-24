import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { User as UserIcon, Mail, Trophy, Flame, CheckCircle, Target } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [goalInput, setGoalInput] = useState('');
  const [goalSaving, setGoalSaving] = useState(false);
  const [goalMsg, setGoalMsg] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/user/profile');
        setStats(res.data);
        setGoalInput(String(res.data.dailyGoal || 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const saveGoal = async () => {
    const val = parseInt(goalInput, 10);
    if (isNaN(val) || val < 1 || val > 50) {
      setGoalMsg({ type: 'error', text: 'Enter a number between 1 and 50' });
      return;
    }
    setGoalSaving(true);
    setGoalMsg(null);
    try {
      const res = await api.put('/user/goal', { dailyGoal: val });
      setStats(prev => ({ ...prev, dailyGoal: res.data.dailyGoal }));
      setGoalMsg({ type: 'success', text: 'Goal updated!' });
    } catch {
      setGoalMsg({ type: 'error', text: 'Failed to update goal' });
    } finally {
      setGoalSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading profile...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <UserIcon size={48} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stats?.name || user?.name}</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Mail size={16} />
              <span>{stats?.email || user?.email}</span>
            </div>
            
            <div style={{ marginTop: '2rem', width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Member Since</div>
                <div style={{ fontWeight: '600' }}>
                  {stats?.createdAt ? new Date(stats.createdAt).toLocaleDateString() : 'Recent'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ flex: '2', minWidth: '400px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Your Statistics</h2>
          
          <div className="dashboard-grid">
            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '0.5rem', fontWeight: '500' }}>
                <CheckCircle size={20} />
                Total Solved
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>{stats?.totalSolved || 0}</div>
            </div>
            
            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(245, 158, 11, 0.05)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)', marginBottom: '0.5rem', fontWeight: '500' }}>
                <Flame size={20} />
                Current Streak
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>{stats?.currentStreak || 0} days</div>
            </div>
            
            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: '12px', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '500' }}>
                <Trophy size={20} />
                Longest Streak
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>{stats?.longestStreak || 0} days</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Target size={20} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Daily Goal</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
          Set how many problems you want to solve each day.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            type="number"
            min="1"
            max="50"
            value={goalInput}
            onChange={e => setGoalInput(e.target.value)}
            className="input-field"
            style={{ width: '100px' }}
          />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>problems / day</span>
          <button
            className="btn btn-primary"
            onClick={saveGoal}
            disabled={goalSaving}
          >
            {goalSaving ? <span className="btn-spinner" /> : 'Save'}
          </button>
          {goalMsg && (
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: goalMsg.type === 'success' ? 'var(--success)' : 'var(--danger)'
            }}>
              {goalMsg.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
