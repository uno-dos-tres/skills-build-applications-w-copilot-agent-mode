import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
      
      console.log(`Fetching leaderboard from: ${apiUrl}`);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const leaderboardData = Array.isArray(data) ? data : (data.results || []);
      console.log('Processed leaderboard data:', leaderboardData);
      
      setLeaderboard(leaderboardData);
      setError(null);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return '📊';
  };

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="card shadow-lg">
          <div className="card-header bg-success text-white">
            <h2 className="card-title mb-0">
              <i className="fas fa-trophy me-2"></i>Leaderboard
            </h2>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="alert alert-info" role="alert">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Loading leaderboard...
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error</h4>
                <p>{error}</p>
                <button className="btn btn-sm btn-danger" onClick={fetchLeaderboard}>
                  Retry
                </button>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">No Leaderboard Data</h4>
                <p>There are no leaderboard entries to display at this time.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" style={{width: '10%'}}>Rank</th>
                      <th scope="col" style={{width: '25%'}}>User</th>
                      <th scope="col" style={{width: '25%'}}>Team</th>
                      <th scope="col" style={{width: '20%'}}>Points</th>
                      <th scope="col" style={{width: '20%'}}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.id} className={index < 3 ? 'table-success' : ''}>
                        <td>
                          <span className="fs-5">{getMedalEmoji(index)}</span>
                          <span className="badge bg-warning text-dark ms-2">{index + 1}</span>
                        </td>
                        <td><strong>{entry.user}</strong></td>
                        <td><span className="badge bg-primary">{entry.team}</span></td>
                        <td><span className="badge bg-info">{entry.points}</span></td>
                        <td><strong className="text-success">{entry.score}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
