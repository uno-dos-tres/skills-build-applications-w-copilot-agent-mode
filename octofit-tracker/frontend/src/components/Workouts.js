import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
      const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
      
      console.log(`Fetching workouts from: ${apiUrl}`);
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const workoutsData = Array.isArray(data) ? data : (data.results || []);
      console.log('Processed workouts data:', workoutsData);
      
      setWorkouts(workoutsData);
      setError(null);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-success';
      case 'medium':
        return 'bg-warning text-dark';
      case 'hard':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="card shadow-lg">
          <div className="card-header bg-danger text-white">
            <h2 className="card-title mb-0">
              <i className="fas fa-fire me-2"></i>Workouts
            </h2>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="alert alert-info" role="alert">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Loading workouts...
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error</h4>
                <p>{error}</p>
                <button className="btn btn-sm btn-danger" onClick={fetchWorkouts}>
                  Retry
                </button>
              </div>
            ) : workouts.length === 0 ? (
              <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">No Workouts Found</h4>
                <p>There are no workouts to display at this time.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" style={{width: '10%'}}>ID</th>
                      <th scope="col" style={{width: '25%'}}>Workout Type</th>
                      <th scope="col" style={{width: '20%'}}>Duration</th>
                      <th scope="col" style={{width: '20%'}}>Calories</th>
                      <th scope="col" style={{width: '25%'}}>Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout) => (
                      <tr key={workout.id}>
                        <td><span className="badge bg-secondary">{workout.id}</span></td>
                        <td><strong>{workout.workout_type}</strong></td>
                        <td>{workout.duration}</td>
                        <td>
                          <span className="badge bg-info">{workout.calories_burned}</span>
                        </td>
                        <td>
                          <span className={`badge ${getDifficultyBadgeColor(workout.difficulty_level)}`}>
                            {workout.difficulty_level}
                          </span>
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

export default Workouts;
