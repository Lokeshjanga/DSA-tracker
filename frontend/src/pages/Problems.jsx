import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Plus, Trash2, Edit } from 'lucide-react';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    difficulty: 'Easy',
    platform: 'LeetCode',
    topic: 'Arrays'
  });

  const topicsList = [
    'Arrays', 'Strings', 'Linked Lists', 'Stack', 'Queue', 
    'Trees', 'Graphs', 'Dynamic Programming', 'Backtracking', 
    'Greedy', 'Binary Search'
  ];

  const fetchProblems = async () => {
    try {
      const res = await api.get('/problems');
      setProblems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/problems', formData);
      setShowModal(false);
      setFormData({ title: '', difficulty: 'Easy', platform: 'LeetCode', topic: 'Arrays' });
      fetchProblems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      try {
        await api.delete(`/problems/${id}`);
        fetchProblems();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading problems...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Problems</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add Problem
        </button>
      </div>

      <div className="card">
        {problems.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No problems added yet. Start your streak today!</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Topic</th>
                <th>Difficulty</th>
                <th>Platform</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(prob => (
                <tr key={prob._id}>
                  <td style={{ fontWeight: '500' }}>{prob.title}</td>
                  <td>{prob.topic}</td>
                  <td><span className={`badge badge-${prob.difficulty.toLowerCase()}`}>{prob.difficulty}</span></td>
                  <td>{prob.platform}</td>
                  <td>{new Date(prob.solvedDate).toLocaleDateString()}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(prob._id)}
                      style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.25rem' }}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Log New Problem</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Problem Title</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  required 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Difficulty</label>
                  <select className="input-field" value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Platform</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={formData.platform} 
                    onChange={(e) => setFormData({...formData, platform: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Topic</label>
                <select className="input-field" value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})}>
                  {topicsList.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn" style={{ flex: 1, backgroundColor: 'var(--border-color)', color: 'var(--text-main)' }} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Save Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problems;
