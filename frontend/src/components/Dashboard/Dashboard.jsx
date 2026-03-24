import React from 'react';
import './Dashboard.css';

const Dashboard = ({ setPage, page, user, content }) => {
  const isAdmin = user?.role === 'admin';

  const renderDashboardHome = () => (
    <div className="dashboard-content-wrapper fade-in">
      {/* 1. WELCOME HEADER SECTION */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h1>Hello, {user?.name || (isAdmin ? "Admin" : "Student")} </h1>
        </div>
        <div className="header-date">
          <span className="icon">📅</span> {new Date().toLocaleDateString('en-GB')}
        </div>
      </div>

      {/* 2. TOP STATS CARDS */}
      <div className="dashboard-main-grid">
        <div className="glass-card stat-box bounce-in">
          <div className="card-info">
            <h3>{isAdmin ? "Total Progress" : "Student Progress"}</h3>
            <p className="large-text">{isAdmin ? "80%" : `${user?.cpi || "0.00"}%`}</p>
          </div>
          <div className="visual-chart blue-chart"></div>
        </div>

        <div className="glass-card stat-box bounce-in" style={{animationDelay: '0.1s'}}>
          <div className="card-info">
            <h3>Total Activity</h3>
            <p className="large-text">80%</p>
          </div>
          <div className="visual-chart green-chart"></div>
        </div>

        <div className="glass-card stat-box bounce-in" style={{animationDelay: '0.2s'}}>
          <div className="card-info">
            <h3>Total Time</h3>
            <p className="large-text">1h 39m</p>
          </div>
          <div className="visual-chart yellow-chart"></div>
        </div>
      </div>
      
      {/* 3. MIDDLE SECTION */}
      <div className="dashboard-secondary-grid">
        <div className="glass-card subject-card">
          <div className="subject-header">
            <h3>Subject Analysis</h3>
            <span className="badge-blue">Grade 2</span>
          </div>
          <div className="progress-container">
            <div className="progress-label"><span>Pending Attendance</span> <span>6/8</span></div>
            <div className="progress-bar-bg"><div className="progress-bar-fill purple" style={{width: '75%'}}></div></div>
          </div>
          <div className="progress-container">
            <div className="progress-label"><span>Assignment</span> <span>3/8</span></div>
            <div className="progress-bar-bg"><div className="progress-bar-fill pink" style={{width: '40%'}}></div></div>
          </div>
        </div>

        <div className="quick-actions-grid">
           {!isAdmin && (
             <>
                <div className="action-tile orange-tile pulse">
                  <span className="tile-icon">📚</span>
                  <h4>Syllabus</h4>
                </div>
                <div className="action-tile purple-tile pulse">
                  <span className="tile-icon">📅</span>
                  <h4>Time-Table</h4>
                </div>
             </>
           )}
           {isAdmin && (
             <div className="admin-status-tile">
                <h4>System Status</h4>
                <p>All Servers are running smooth.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="erp-app-shell">
      {/* SIDEBAR */}
      <aside className="erp-modern-sidebar">
        <div className="brand-section">
          <h2>NOBLE ERP</h2>
        </div>
        
        <nav className="nav-menu">
          <button className={`menu-item ${page === 'dashboard' ? 'active' : ''}`} onClick={() => setPage('dashboard')}>
             <span className="icon">🏠</span> Dashboard
          </button>
          
          {/* --- STUDENT SIDE RESULT MENU ADDED HERE --- */}
          {!isAdmin && (
            <button className={`menu-item ${page === 'result' ? 'active' : ''}`} onClick={() => setPage('result')}>
               <span className="icon">📝</span> Result
            </button>
          )}

          {isAdmin && (
            <>
              <button className={`menu-item ${page === 'add-result' ? 'active' : ''}`} onClick={() => setPage('add-result')}>
                <span className="icon">➕</span> Add Marks
              </button>
              <button className={`menu-item ${page === 'admin-dashboard' ? 'active' : ''}`} onClick={() => setPage('admin-dashboard')}>
                <span className="icon">📋</span> Student List
              </button>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn-modern" onClick={() => window.location.reload()}>
            <span className="icon">🚪</span> Log out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-viewport">
        <div className="content-scroller">
          {page === 'dashboard' ? renderDashboardHome() : content}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;