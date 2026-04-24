import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { ArrowLeft, Check } from 'lucide-react';

const TopicDetail = () => {
  const { topicName } = useParams();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await api.get(`/topics/${topicName}`);
        setProblems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, [topicName]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading problems...</div>;

  return (
    <div>
      <div className="page-header" style={{ alignItems: 'flex-start', flexDirection: 'column', gap: '1rem' }}>
        <Link to="/topics" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Back to Topics
        </Link>
        <h1 className="page-title">{topicName}</h1>
      </div>

      <div className="card">
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Solved Problems</h2>
          <span className="badge badge-medium">{problems.length} Solved</span>
        </div>
        
        {problems.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>You haven't logged any problems for this topic yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Platform</th>
                <th>Date Solved</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(prob => (
                <tr key={prob._id}>
                  <td style={{ fontWeight: '500' }}>{prob.title}</td>
                  <td><span className={`badge badge-${prob.difficulty.toLowerCase()}`}>{prob.difficulty}</span></td>
                  <td>{prob.platform}</td>
                  <td>{new Date(prob.solvedDate).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)' }}>
                      <Check size={16} /> Solved
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;
