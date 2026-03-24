import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddResult.css';

const AddResult = ({ setPage }) => {
  const subjectConfig = {
    1: ['HTML', 'C++', 'Cloud System', 'Mathematics'],
    2: ['React', 'RDBMS', 'Java', 'Data Structures'],
    3: ['Full Stack', 'ASP.NET', 'Data Science', 'Operating System'],
    4: ['PHP', 'Software System', 'Adv. Java', 'Computer Network'],
    5: ['OOP', 'Cloud Computing', 'Software Engineering', 'Python']
  };

  const [formData, setFormData] = useState({
    name: '',
    enrollmentNo: '',
    branch: '',
    semester: '',
    cpi: '',
    subjects: []
  });

  // --- AUTOMATIC CPI CALCULATION LOGIC ---
  useEffect(() => {
    if (formData.subjects.length > 0) {
      const totalMarks = formData.subjects.reduce((sum, sub) => {
        return sum + (parseFloat(sub.marks) || 0);
      }, 0);

      // Average calculate kari ne 10 thi bhagi ne CPI kadhva (Assuming 100 marks per subject)
      const calculatedCPI = (totalMarks / (formData.subjects.length * 100)) * 10;
      
      setFormData(prev => ({
        ...prev,
        cpi: calculatedCPI.toFixed(2) // 2 decimal point sudhi
      }));
    }
  }, [formData.subjects]); // Jyare pan subjects na marks badlay tyare aa chal-she

  const handleSemesterChange = (sem) => {
    const subjectsForSem = subjectConfig[sem] || [];
    const updatedSubjects = subjectsForSem.map(subName => ({
      sname: subName,
      marks: ''
    }));

    setFormData({ 
      ...formData, 
      semester: sem, 
      subjects: updatedSubjects,
      cpi: '' // Semester badlay to CPI reset thay
    });
  };

  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index].marks = value;
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/add-student', formData);
      if (res.data.success) {
        alert("Student Result Added Successfully!");
        setPage('admin-dashboard');
      }
    } catch (err) {
      console.log(err);
      alert("Error adding data!");
    }
  };

  return (
    <div className="add-result-container">
      <div className="form-header">
        <h2>Add Student Marks</h2>
      </div>
      <form className="infix-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="input-group">
            <label>Name</label>
            <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Enrollment No</label>
            <input type="text" value={formData.enrollmentNo} onChange={(e)=>setFormData({...formData, enrollmentNo: e.target.value})} required />
          </div>
          <div className="input-group">
            <label>Branch</label>
            <select value={formData.branch} onChange={(e)=>setFormData({...formData, branch: e.target.value})} required>
              <option value="">Select</option>
              <option value="Computer">Computer</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className="input-group">
            <label>Semester</label>
            <input 
              type="number" min="1" max="5"
              value={formData.semester}
              onChange={(e) => handleSemesterChange(e.target.value)} 
              required 
            />
          </div>
        </div>

        {formData.subjects.length > 0 && (
          <>
            <h3 className="section-title">Subject Marks (Sem {formData.semester})</h3>
            <div className="subject-grid">
              {formData.subjects.map((sub, index) => (
                <div className="input-group" key={index}>
                  <label>{sub.sname}</label>
                  <input 
                    type="number" max="100"
                    placeholder="Marks (0-100)"
                    value={sub.marks}
                    onChange={(e) => handleSubjectChange(index, e.target.value)} 
                    required 
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="form-grid" style={{marginTop: '25px'}}>
          <div className="input-group">
            <label>Overall CGPI </label>
            <input 
              type="number" 
              value={formData.cpi} 
              readOnly // User potana hath thi change na kari shake
              style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">Save Result</button>
        </div>
      </form>
    </div>
  );
};

export default AddResult;