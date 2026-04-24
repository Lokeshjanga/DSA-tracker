import { useState } from 'react';
import { ExternalLink, Filter } from 'lucide-react';

const PROBLEMS = [
  // ── Arrays ─────────────────────────────────────────────────────────────
  {
    topic: 'Arrays',
    name: 'Two Sum',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/two-sum/',
  },
  {
    topic: 'Arrays',
    name: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
  },
  {
    topic: 'Arrays',
    name: 'Maximum Subarray (Kadane\'s)',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/maximum-subarray/',
  },
  {
    topic: 'Arrays',
    name: 'Product of Array Except Self',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/product-of-array-except-self/',
  },
  {
    topic: 'Arrays',
    name: 'Container With Most Water',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/container-with-most-water/',
  },
  {
    topic: 'Arrays',
    name: '3Sum',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/3sum/',
  },
  {
    topic: 'Arrays',
    name: 'Trapping Rain Water',
    difficulty: 'Hard',
    priority: 'Medium',
    url: 'https://leetcode.com/problems/trapping-rain-water/',
  },

  // ── Strings ────────────────────────────────────────────────────────────
  {
    topic: 'Strings',
    name: 'Valid Anagram',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/valid-anagram/',
  },
  {
    topic: 'Strings',
    name: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
  },
  {
    topic: 'Strings',
    name: 'Group Anagrams',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/group-anagrams/',
  },
  {
    topic: 'Strings',
    name: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    priority: 'Medium',
    url: 'https://leetcode.com/problems/longest-palindromic-substring/',
  },
  {
    topic: 'Strings',
    name: 'Minimum Window Substring',
    difficulty: 'Hard',
    priority: 'High',
    url: 'https://leetcode.com/problems/minimum-window-substring/',
  },

  // ── Linked Lists ───────────────────────────────────────────────────────
  {
    topic: 'Linked Lists',
    name: 'Reverse Linked List',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/reverse-linked-list/',
  },
  {
    topic: 'Linked Lists',
    name: 'Linked List Cycle',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/linked-list-cycle/',
  },
  {
    topic: 'Linked Lists',
    name: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
  },
  {
    topic: 'Linked Lists',
    name: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
  },
  {
    topic: 'Linked Lists',
    name: 'LRU Cache',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/lru-cache/',
  },

  // ── Stack ──────────────────────────────────────────────────────────────
  {
    topic: 'Stack',
    name: 'Valid Parentheses',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/valid-parentheses/',
  },
  {
    topic: 'Stack',
    name: 'Min Stack',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/min-stack/',
  },
  {
    topic: 'Stack',
    name: 'Daily Temperatures',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/daily-temperatures/',
  },
  {
    topic: 'Stack',
    name: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    priority: 'Medium',
    url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
  },

  // ── Queue ──────────────────────────────────────────────────────────────
  {
    topic: 'Queue',
    name: 'Sliding Window Maximum',
    difficulty: 'Hard',
    priority: 'High',
    url: 'https://leetcode.com/problems/sliding-window-maximum/',
  },

  // ── Trees ──────────────────────────────────────────────────────────────
  {
    topic: 'Trees',
    name: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
  },
  {
    topic: 'Trees',
    name: 'Invert Binary Tree',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/invert-binary-tree/',
  },
  {
    topic: 'Trees',
    name: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
  },
  {
    topic: 'Trees',
    name: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/validate-binary-search-tree/',
  },
  {
    topic: 'Trees',
    name: 'Lowest Common Ancestor of a BST',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
  },
  {
    topic: 'Trees',
    name: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    priority: 'Medium',
    url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
  },

  // ── Graphs ─────────────────────────────────────────────────────────────
  {
    topic: 'Graphs',
    name: 'Number of Islands',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/number-of-islands/',
  },
  {
    topic: 'Graphs',
    name: 'Clone Graph',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/clone-graph/',
  },
  {
    topic: 'Graphs',
    name: 'Course Schedule (Topological Sort)',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/course-schedule/',
  },
  {
    topic: 'Graphs',
    name: 'Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    priority: 'Medium',
    url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
  },
  {
    topic: 'Graphs',
    name: 'Word Ladder',
    difficulty: 'Hard',
    priority: 'Medium',
    url: 'https://leetcode.com/problems/word-ladder/',
  },

  // ── Dynamic Programming ────────────────────────────────────────────────
  {
    topic: 'Dynamic Programming',
    name: 'Climbing Stairs',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/climbing-stairs/',
  },
  {
    topic: 'Dynamic Programming',
    name: 'House Robber',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/house-robber/',
  },
  {
    topic: 'Dynamic Programming',
    name: 'Coin Change',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/coin-change/',
  },
  {
    topic: 'Dynamic Programming',
    name: 'Longest Common Subsequence',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/longest-common-subsequence/',
  },
  {
    topic: 'Dynamic Programming',
    name: '0/1 Knapsack',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/',
  },
  {
    topic: 'Dynamic Programming',
    name: 'Word Break',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/word-break/',
  },
  {
    topic: 'Dynamic Programming',
    name: 'Edit Distance',
    difficulty: 'Hard',
    priority: 'Medium',
    url: 'https://leetcode.com/problems/edit-distance/',
  },

  // ── Backtracking ───────────────────────────────────────────────────────
  {
    topic: 'Backtracking',
    name: 'Subsets',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/subsets/',
  },
  {
    topic: 'Backtracking',
    name: 'Combination Sum',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/combination-sum/',
  },
  {
    topic: 'Backtracking',
    name: 'N-Queens',
    difficulty: 'Hard',
    priority: 'Medium',
    url: 'https://leetcode.com/problems/n-queens/',
  },

  // ── Greedy ─────────────────────────────────────────────────────────────
  {
    topic: 'Greedy',
    name: 'Jump Game',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/jump-game/',
  },
  {
    topic: 'Greedy',
    name: 'Merge Intervals',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/merge-intervals/',
  },
  {
    topic: 'Greedy',
    name: 'Task Scheduler',
    difficulty: 'Medium',
    priority: 'Medium',
    url: 'https://leetcode.com/problems/task-scheduler/',
  },

  // ── Binary Search ──────────────────────────────────────────────────────
  {
    topic: 'Binary Search',
    name: 'Binary Search',
    difficulty: 'Easy',
    priority: 'High',
    url: 'https://leetcode.com/problems/binary-search/',
  },
  {
    topic: 'Binary Search',
    name: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
  },
  {
    topic: 'Binary Search',
    name: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    priority: 'High',
    url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
  },
  {
    topic: 'Binary Search',
    name: 'Kth Smallest Element in a Sorted Matrix',
    difficulty: 'Medium',
    priority: 'Medium',
    url: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/',
  },
];

const TOPIC_ICONS = {
  Arrays: '📊',
  Strings: '🔤',
  'Linked Lists': '🔗',
  Stack: '📚',
  Queue: '🔄',
  Trees: '🌳',
  Graphs: '🕸️',
  'Dynamic Programming': '🧠',
  Backtracking: '↩️',
  Greedy: '⚡',
  'Binary Search': '🎯',
};

const TOPIC_COLORS = {
  Arrays:              { bg: 'rgba(79,70,229,0.1)',   border: 'rgba(79,70,229,0.3)',   text: '#4f46e5' },
  Strings:             { bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.3)',  text: '#059669' },
  'Linked Lists':      { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)',  text: '#d97706' },
  Stack:               { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   text: '#dc2626' },
  Queue:               { bg: 'rgba(236,72,153,0.1)',  border: 'rgba(236,72,153,0.3)',  text: '#db2777' },
  Trees:               { bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.3)',   text: '#16a34a' },
  Graphs:              { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.3)',  text: '#6366f1' },
  'Dynamic Programming':{ bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)',  text: '#9333ea' },
  Backtracking:        { bg: 'rgba(14,165,233,0.1)',  border: 'rgba(14,165,233,0.3)',  text: '#0284c7' },
  Greedy:              { bg: 'rgba(251,146,60,0.1)',  border: 'rgba(251,146,60,0.3)',  text: '#ea580c' },
  'Binary Search':     { bg: 'rgba(20,184,166,0.1)',  border: 'rgba(20,184,166,0.3)',  text: '#0d9488' },
};

const DIFFICULTY_ORDER = { Easy: 0, Medium: 1, Hard: 2 };
const PRIORITY_ORDER   = { High: 0, Medium: 1, Low: 2 };

const DSASheet = () => {
  const [diffFilter, setDiffFilter]   = useState('All');
  const [prioFilter, setPrioFilter]   = useState('All');
  const [search, setSearch]           = useState('');
  const [collapsed, setCollapsed]     = useState({});

  const topics = [...new Set(PROBLEMS.map(p => p.topic))];

  const filtered = PROBLEMS.filter(p => {
    if (diffFilter !== 'All' && p.difficulty !== diffFilter) return false;
    if (prioFilter !== 'All' && p.priority !== prioFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const byTopic = topics.reduce((acc, t) => {
    acc[t] = filtered
      .filter(p => p.topic === t)
      .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    return acc;
  }, {});

  const totalShown  = filtered.length;
  const highCount   = filtered.filter(p => p.priority === 'High').length;
  const easyCount   = filtered.filter(p => p.difficulty === 'Easy').length;
  const mediumCount = filtered.filter(p => p.difficulty === 'Medium').length;
  const hardCount   = filtered.filter(p => p.difficulty === 'Hard').length;

  const toggleCollapse = (topic) =>
    setCollapsed(c => ({ ...c, [topic]: !c[topic] }));

  return (
    <div>
      {/* Header */}
      <div className="page-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-title">Top 50 DSA Problems</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
              Curated for product-based company interviews · sorted by interview frequency
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <div className="sheet-stat-chip sheet-chip-blue">{totalShown} problems</div>
            <div className="sheet-stat-chip sheet-chip-orange">{highCount} high priority</div>
            <div className="sheet-stat-chip sheet-chip-green">{easyCount}E</div>
            <div className="sheet-stat-chip sheet-chip-yellow">{mediumCount}M</div>
            <div className="sheet-stat-chip sheet-chip-red">{hardCount}H</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', width: '100%' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '320px' }}>
            <input
              className="input-field"
              placeholder="Search problems…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '1rem', fontSize: '0.875rem' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={14} color="var(--text-muted)" />
            {['All','Easy','Medium','Hard'].map(d => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className={`sheet-filter-btn ${diffFilter === d ? 'sheet-filter-active' : ''}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['All','High','Medium','Low'].map(p => (
              <button
                key={p}
                onClick={() => setPrioFilter(p)}
                className={`sheet-filter-btn ${prioFilter === p ? 'sheet-filter-active' : ''}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topic Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {topics.map(topic => {
          const problems = byTopic[topic];
          if (problems.length === 0) return null;
          const color = TOPIC_COLORS[topic] || TOPIC_COLORS['Arrays'];
          const isCollapsed = collapsed[topic];

          return (
            <div key={topic} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Topic Header */}
              <button
                onClick={() => toggleCollapse(topic)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.5rem',
                  background: color.bg,
                  border: 'none',
                  borderBottom: isCollapsed ? 'none' : `1px solid ${color.border}`,
                  cursor: 'pointer',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{TOPIC_ICONS[topic]}</span>
                  <span style={{ fontWeight: '700', fontSize: '1rem', color: color.text }}>{topic}</span>
                  <span style={{
                    background: color.border,
                    color: color.text,
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.15rem 0.55rem',
                    borderRadius: '999px',
                  }}>
                    {problems.length}
                  </span>
                </div>
                <span style={{ color: color.text, fontSize: '0.75rem', fontWeight: '600', userSelect: 'none' }}>
                  {isCollapsed ? '▼ Show' : '▲ Hide'}
                </span>
              </button>

              {/* Problem Table */}
              {!isCollapsed && (
                <table className="data-table" style={{ borderRadius: 0, border: 'none' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>#</th>
                      <th>Problem</th>
                      <th style={{ width: '110px' }}>Difficulty</th>
                      <th style={{ width: '110px' }}>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {problems.map((prob, idx) => (
                      <tr key={prob.name}>
                        <td style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.8rem' }}>
                          {idx + 1}
                        </td>
                        <td>
                          <a
                            href={prob.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sheet-problem-link"
                          >
                            {prob.name}
                            <ExternalLink size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
                          </a>
                        </td>
                        <td>
                          <span className={`badge badge-${prob.difficulty.toLowerCase()}`}>
                            {prob.difficulty}
                          </span>
                        </td>
                        <td>
                          <span className={`sheet-priority-badge sheet-priority-${prob.priority.toLowerCase()}`}>
                            {prob.priority === 'High' ? '🔥' : prob.priority === 'Medium' ? '⬆' : '➖'} {prob.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DSASheet;
