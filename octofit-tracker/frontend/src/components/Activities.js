import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
      
      console.log(`Fetching activities from: ${apiUrl}`);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const activitiesData = Array.isArray(data) ? data : (data.results || []);
      console.log('Processed activities data:', activitiesData);
      
      setActivities(activitiesData);
      setError(null);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h2 className="card-title mb-0">
              <i className="fas fa-dumbbell me-2"></i>Activities
            </h2>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="alert alert-info" role="alert">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Loading activities...
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error</h4>
                <p>{error}</p>
                <button className="btn btn-sm btn-danger" onClick={fetchActivities}>
                  Retry
                </button>
              </div>
            ) : activities.length === 0 ? (
              <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">No Activities Found</h4>
                <p>There are no activities to display at this time.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" style={{width: '10%'}}>ID</th>
                      <th scope="col" style={{width: '20%'}}>User</th>
                      <th scope="col" style={{width: '25%'}}>Activity Type</th>
                      <th scope="col" style={{width: '20%'}}>Duration</th>
                      <th scope="col" style={{width: '25%'}}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity) => (
                      <tr key={activity.id}>
                        <td><span className="badge bg-secondary">{activity.id}</span></td>
                        <td>{activity.user}</td>
                        <td><span className="badge bg-info">{activity.activity_type}</span></td>
                        <td>{activity.duration}</td>
                        <td>{new Date(activity.date).toLocaleDateString()}</td>
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

export default Activities;
