import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ setPage, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 1. Pehla Admin login check (Hardcoded)
    if (email === 'admin@noble.com' && password === 'admin123') {
      const adminData = { name: 'Super Admin', role: 'admin' };
      setUser(adminData);
      setPage('admin-dashboard');
    } else {
      // 2. Jo admin na hoy to Backend ma Student check karo
      try {
        const res = await axios.post('http://localhost:5000/api/login', { 
          email: email, 
          password: password 
        });
        
        if (res.data.success) {
          // Backend mathi student role sathe data aavse
          const studentData = { ...res.data.user, role: 'student' };
          
          setUser(res.data.user);
          setPage('student-view'); 
        }
      } catch (err) {
        alert("Invalid User ID or Record not found! Backend check karo.");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card-container">
        <div className="login-side-blue">
          <div className="branding-box">
           <h1>Noble University</h1>
            <p>ICRP System</p>
          </div>
        </div>
        <div className="login-side-white">
          <div className="login-form-box">
            <h2 className="login-title">Welcome</h2>
            <form onSubmit={handleLogin}>
              <div className="floating-input">
                <label>User ID / Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="floating-input">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="login-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;