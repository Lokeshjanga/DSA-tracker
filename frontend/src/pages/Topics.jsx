import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { Folder } from 'lucide-react';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get('/topics');
        setTopics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading topics...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Topics</h1>
      </div>

      <div className="topic-list">
        {topics.map(topic => {
          const percent = topic.totalProblems > 0 ? Math.round((topic.solved / topic.totalProblems) * 100) : 0;
          return (
            <Link to={`/topics/${topic.name}`} key={topic.id} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px', color: 'var(--primary)' }}>
                    <Folder size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main)' }}>{topic.name}</h3>
                </div>
                
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{percent}%</span>
                  </div>
                  <div className="progress-container" style={{ height: '6px' }}>
                    <div className="progress-bar" style={{ width: `${percent}%` }}></div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'right' }}>
                    {topic.solved} / {topic.totalProblems} Solved
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
