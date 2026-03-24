import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllStudents.css';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [editFormData, setEditFormData] = useState({ name: '', branch: '', semester: '', cpi: '' });

  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students').then(res => {
      setStudents(res.data);
      setFilteredStudents(res.data);
    }).catch(err => console.log(err));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleEditClick = (student) => {
    setEditingId(student._id);
    setEditFormData({ name: student.name, branch: student.branch, semester: student.semester, cpi: student.cpi });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async (id) => {
    try {
      const payload = { 
        name: editFormData.name, 
        branch: editFormData.branch, 
        semester: Number(editFormData.semester), 
        cpi: parseFloat(editFormData.cpi) 
      };
      await axios.put(`http://localhost:5000/api/students/${id}`, payload);
      alert("Updated Successfully! ✅");
      setEditingId(null);
      fetchStudents();
    } catch (err) { alert("Error updating!"); }
  };

  return (
    <div className="student-container">
      <div className="table-wrapper">
        <table className="infix-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Enroll No.</th>
              <th style={{ width: '25%' }}>Name</th>
              <th style={{ width: '20%' }}>Branch</th>
              <th style={{ width: '10%' }}>Sem</th>
              <th style={{ width: '10%' }}>CPI</th>
              <th style={{ width: '20%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s._id} className={editingId === s._id ? "editing-row" : ""}>
                <td>{s.enrollmentNo}</td>
                {editingId === s._id ? (
                  <>
                    <td><input type="text" name="name" className="edit-input" value={editFormData.name} onChange={handleEditFormChange} /></td>
                    <td><input type="text" name="branch" className="edit-input" value={editFormData.branch} onChange={handleEditFormChange} /></td>
                    <td><input type="number" name="semester" className="edit-input-sm" value={editFormData.semester} onChange={handleEditFormChange} /></td>
                    <td><input type="number" step="0.01" name="cpi" className="edit-input-sm" value={editFormData.cpi} onChange={handleEditFormChange} /></td>
                    <td>
                      <div className="edit-btn-group">
                        <button className="save-btn-small" onClick={() => handleSaveClick(s._id)}>✅</button>
                        <button className="cancel-btn-small" onClick={() => setEditingId(null)}>❌</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{s.name}</td>
                    <td>{s.branch}</td>
                    <td>{s.semester}</td>
                    <td>{s.cpi}</td>
                    <td className="actions">
                      <button className="edit-icon" onClick={() => handleEditClick(s)}>✏️</button>
                      <button className="delete-icon" onClick={() => { if(window.confirm("Delete?")) axios.delete(`http://localhost:5000/api/students/${s._id}`).then(()=>fetchStudents()) }}>🗑️</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudents;