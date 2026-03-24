import React, { useState } from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import AllStudents from './components/AllStudents/AllStudents';
import AddResult from './components/AddResult/AddResult';
import StudentResult from './components/StudentResult/StudentResult';

function App() {
  const [page, setPage] = useState('login'); 
  const [user, setUser] = useState(null);

  // Aa function check karshe ke kayi screen batavvi
  const renderContent = () => {
    if (!user) return null;

    if (user.role === 'admin') {
      switch (page) {
        case 'admin-dashboard':
          return <AllStudents />;
        case 'add-result':
          return <AddResult setPage={setPage} />;
        default:
          return <AllStudents />; // Default admin page
      }
    } 
    
    if (user.role === 'student') {
      switch (page) {
        case 'student-view':
          return <StudentResult user={user} />;
        case 'attendance':
          return <div style={{padding: '20px'}}>Attendance Feature Coming Soon...</div>;
        default:
          return <StudentResult user={user} />; // Default student page
      }
    }
  };

  return (
    <div className="App">
      {page === 'login' ? (
        <Login setPage={setPage} setUser={setUser} />
      ) : (
        <Dashboard 
          setPage={setPage} 
          page={page}
          user={user} 
          content={renderContent()} 
        />
      )}
    </div>
  );
}

export default App;