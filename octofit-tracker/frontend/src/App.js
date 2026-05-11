import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  console.log('App component loaded');
  console.log('Codespace Name:', process.env.REACT_APP_CODESPACE_NAME || 'localhost');

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <i className="fas fa-heart me-2"></i>OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    <i className="fas fa-dumbbell me-1"></i>Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="fas fa-trophy me-1"></i>Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <i className="fas fa-users me-1"></i>Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="fas fa-user-circle me-1"></i>Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <i className="fas fa-fire me-1"></i>Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container-fluid py-5">
                  <div className="container">
                    <div className="card shadow-lg border-0">
                      <div className="card-body p-5">
                        <h1 className="display-4 fw-bold mb-4 text-primary">
                          <i className="fas fa-heart me-3"></i>Welcome to OctoFit Tracker
                        </h1>
                        <p className="lead mb-4 text-muted">
                          Track your fitness activities, compete with teams, and see who's at the top of the leaderboard!
                        </p>
                        <hr className="my-4" />
                        <div className="row g-4 mt-4">
                          <div className="col-md-6">
                            <h5 className="text-success mb-3">
                              <i className="fas fa-check-circle me-2"></i>Features
                            </h5>
                            <ul className="list-unstyled">
                              <li className="mb-2">
                                <i className="fas fa-chart-line text-primary me-2"></i>Track your activities
                              </li>
                              <li className="mb-2">
                                <i className="fas fa-trophy text-warning me-2"></i>Compete on the leaderboard
                              </li>
                              <li className="mb-2">
                                <i className="fas fa-users text-info me-2"></i>Join or create teams
                              </li>
                              <li className="mb-2">
                                <i className="fas fa-dumbbell text-danger me-2"></i>Explore personalized workouts
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <h5 className="text-success mb-3">
                              <i className="fas fa-arrow-right me-2"></i>Get Started
                            </h5>
                            <p className="mb-3">Use the navigation menu above to explore:</p>
                            <div className="d-flex flex-wrap gap-2">
                              <Link to="/activities" className="btn btn-sm btn-outline-primary">
                                <i className="fas fa-dumbbell me-1"></i>Activities
                              </Link>
                              <Link to="/leaderboard" className="btn btn-sm btn-outline-success">
                                <i className="fas fa-trophy me-1"></i>Leaderboard
                              </Link>
                              <Link to="/teams" className="btn btn-sm btn-outline-info">
                                <i className="fas fa-users me-1"></i>Teams
                              </Link>
                              <Link to="/users" className="btn btn-sm btn-outline-warning">
                                <i className="fas fa-user-circle me-1"></i>Users
                              </Link>
                              <Link to="/workouts" className="btn btn-sm btn-outline-danger">
                                <i className="fas fa-fire me-1"></i>Workouts
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
