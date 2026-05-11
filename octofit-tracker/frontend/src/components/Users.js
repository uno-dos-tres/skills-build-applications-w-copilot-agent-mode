import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/users/`;
      
      console.log(`Fetching users from: ${apiUrl}`);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const usersData = Array.isArray(data) ? data : (data.results || []);
      console.log('Processed users data:', usersData);
      
      setUsers(usersData);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="card shadow-lg">
          <div className="card-header bg-warning text-dark">
            <h2 className="card-title mb-0">
              <i className="fas fa-user-circle me-2"></i>Users
            </h2>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="alert alert-info" role="alert">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Loading users...
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error</h4>
                <p>{error}</p>
                <button className="btn btn-sm btn-danger" onClick={fetchUsers}>
                  Retry
                </button>
              </div>
            ) : users.length === 0 ? (
              <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">No Users Found</h4>
                <p>There are no users to display at this time.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" style={{width: '10%'}}>ID</th>
                      <th scope="col" style={{width: '25%'}}>Username</th>
                      <th scope="col" style={{width: '30%'}}>Email</th>
                      <th scope="col" style={{width: '17%'}}>First Name</th>
                      <th scope="col" style={{width: '18%'}}>Last Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td><span className="badge bg-secondary">{user.id}</span></td>
                        <td><strong>{user.username}</strong></td>
                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
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

export default Users;
