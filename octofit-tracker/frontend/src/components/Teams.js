import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
      
      console.log(`Fetching teams from: ${apiUrl}`);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const teamsData = Array.isArray(data) ? data : (data.results || []);
      console.log('Processed teams data:', teamsData);
      
      setTeams(teamsData);
      setError(null);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="card shadow-lg">
          <div className="card-header bg-info text-white">
            <h2 className="card-title mb-0">
              <i className="fas fa-users me-2"></i>Teams
            </h2>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="alert alert-info" role="alert">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Loading teams...
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error</h4>
                <p>{error}</p>
                <button className="btn btn-sm btn-danger" onClick={fetchTeams}>
                  Retry
                </button>
              </div>
            ) : teams.length === 0 ? (
              <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">No Teams Found</h4>
                <p>There are no teams to display at this time.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" style={{width: '10%'}}>ID</th>
                      <th scope="col" style={{width: '25%'}}>Team Name</th>
                      <th scope="col" style={{width: '40%'}}>Description</th>
                      <th scope="col" style={{width: '15%'}}>Members</th>
                      <th scope="col" style={{width: '10%'}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team.id}>
                        <td><span className="badge bg-secondary">{team.id}</span></td>
                        <td><strong>{team.name}</strong></td>
                        <td>{team.description}</td>
                        <td><span className="badge bg-success">{team.members_count}</span></td>
                        <td>
                          <button className="btn btn-sm btn-primary" title="View Team">
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
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

export default Teams;
