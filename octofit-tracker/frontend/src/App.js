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
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 200 200" 
                className="me-2"
                style={{height: '45px', width: 'auto', fill: '#00d4d4'}}
              >
                <circle cx="100" cy="100" r="95" fill="#0a2640" stroke="#00d4d4" strokeWidth="4"/>
                <circle cx="100" cy="70" r="35" fill="#00d4d4"/>
                <circle cx="85" cy="60" r="8" fill="#0a2640"/>
                <circle cx="115" cy="60" r="8" fill="#0a2640"/>
                <circle cx="87" cy="58" r="3" fill="#00d97e"/>
                <circle cx="117" cy="58" r="3" fill="#00d97e"/>
                <ellipse cx="100" cy="110" rx="28" ry="32" fill="#0066cc"/>
                <path d="M 70 135 Q 55 150 60 170" stroke="#00d4d4" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M 75 138 Q 60 160 70 180" stroke="#0066cc" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M 130 135 Q 145 150 140 170" stroke="#00d4d4" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M 125 138 Q 140 160 130 180" stroke="#0066cc" strokeWidth="6" fill="none" strokeLinecap="round"/>
                <path d="M 90 142 Q 85 165 90 185" stroke="#00d97e" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M 110 142 Q 115 165 110 185" stroke="#00d97e" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M 60 55 Q 50 50 45 60" stroke="#00d97e" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <circle cx="42" cy="70" r="8" fill="#00d97e" stroke="#006644" strokeWidth="2"/>
                <path d="M 140 55 Q 150 50 155 60" stroke="#00d97e" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <circle cx="158" cy="70" r="8" fill="#00d97e" stroke="#006644" strokeWidth="2"/>
                <path d="M 50 35 Q 100 10 150 35" stroke="#00d97e" strokeWidth="5" fill="none" strokeLinecap="round"/>
              </svg>
              OctoFit Tracker
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
