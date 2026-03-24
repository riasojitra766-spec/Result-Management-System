import React from 'react';
import './StudentResult.css';

const StudentResult = ({ user }) => {
  return (
    <div className="result-container-new">
      {/* Header: Name and Overall CPI */}
      <div className="result-header-flex">
        <div className="student-profile">
          <div className="profile-img">👨‍🎓</div>
          <div>
            <h3>{user?.name || "Student Name"}</h3>
            <p>ID: {user?.enrollmentNo}</p>
          </div>
        </div>
        <div className="overall-perf">
          <p>Overall Performance</p>
          <h2 className="sgpa-text">{user?.cpi || "0.00"}</h2>
        </div>
      </div>

      {/* Main Details Table */}
      <div className="marks-table-wrapper">
        <table className="pro-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Branch</th>
              <th>Semester</th>
              <th>Grade Point (CPI)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NOBLE-101</td>
              <td>{user?.branch || "N/A"}</td>
              <td>{user?.semester || "1"}</td>
              <td><span className="grade-badge">{user?.cpi || "0.00"}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Subject-wise Marks Section - AA NAVU CHE */}
      <div className="subjects-details-section">
        <h4 className="sub-title">Subject-wise Analysis</h4>
        <div className="subject-grid-display">
          {user?.subjects && user.subjects.length > 0 ? (
            user.subjects.map((sub, index) => (
              <div key={index} className="subject-row-item">
                <span>{sub.sname}</span>
                <strong>{sub.marks} / 50</strong>
              </div>
            ))
          ) : (
            <p className="no-data">No subject details available.</p>
          )}
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="footer-stats">
        <div className="stat-box">Class Attended: 45/50</div>
        <div className="stat-box">Status: {user?.cpi >= 4 ? 'PASS' : 'FAIL'}</div>
      </div>
    </div>
  );
};

export default StudentResult;