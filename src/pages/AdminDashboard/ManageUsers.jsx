import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null); // For holding selected teacher for update or delete
  const [formData, setFormData] = useState({
    teacher_id: "",
    name: "",
    password: "",
    subject: "",
    contact_info: "",
    address: "",
  });
  const [action, setAction] = useState(""); // "add", "update", or "remove"
  const [error, setError] = useState(""); // For error handling

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/teachers');
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError("Error fetching teachers: " + error.message);
    }
  };

  // Handle Add Teacher button click
  const handleAddTeacher = () => {
    setAction("add");
    setSelectedTeacher(null); // Clear any selected teacher
    setFormData({
      teacher_id: "",
      name: "",
      password: "",
      subject: "",
      contact_info: "",
      address: "",
    });
    setError(""); // Reset error
  };

  // Handle Update Teacher button click
  const handleUpdateTeacher = () => {
    setAction("update");
    setSelectedTeacher(null); // No selected teacher initially
    setFormData({
      teacher_id: "",
      name: "",
      password: "",
      subject: "",
      contact_info: "",
      address: "",
    });
    setError(""); // Reset error
  };

  // Handle Remove Teacher button click
  const handleDeleteTeacher = () => {
    setAction("remove");
    setSelectedTeacher(null); // No selected teacher initially
    setFormData({
      teacher_id: "",
      name: "",
      password: "",
      subject: "",
      contact_info: "",
      address: "",
    });
    setError(""); // Reset error
  };

  // Handle form submission for adding or updating a teacher
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (action === "add") {
      try {
        const response = await axios.post('http://localhost:5000/api/teacher', formData);
        setTeachers(prevTeachers => [...prevTeachers, response.data.teacherDetails]);
        setFormData({
          teacher_id: "",
          name: "",
          password: "",
          subject: "",
          contact_info: "",
          address: "",
        });
        setError(""); // Reset error on successful Add
      } catch (error) {
        setError("Error adding teacher: " + error.message);
      }
    } else if (action === "update") {
      if (!formData.teacher_id) {
        setError("Please enter a teacher ID to update.");
        return;
      }
      try {
        const response = await axios.put(`http://localhost:5000/api/teacher/${formData.teacher_id}`, formData);
        setTeachers(prevTeachers => prevTeachers.map((teacher) =>
          teacher.teacher_id === formData.teacher_id ? response.data.teacherDetails : teacher
        ));
        setFormData({
          teacher_id: "",
          name: "",
          password: "",
          subject: "",
          contact_info: "",
          address: "",
        });
        setError(""); // Reset error on successful Update
      } catch (error) {
        setError("Error updating teacher: " + error.message);
      }
    } else if (action === "remove") {
      if (!formData.teacher_id) {
        setError("Please enter a teacher ID to remove.");
        return;
      }
      try {
        await axios.delete(`http://localhost:5000/api/teacher/${formData.teacher_id}`);
        setTeachers(prevTeachers => prevTeachers.filter((teacher) => teacher.teacher_id !== formData.teacher_id));
        setFormData({
          teacher_id: "",
          name: "",
          password: "",
          subject: "",
          contact_info: "",
          address: "",
        });
        setError(""); // Reset error on successful removal
      } catch (error) {
        setError("Error deleting teacher: " + error.message);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Manage Teachers</h3>

      {/* Action Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleAddTeacher} style={{ padding: '10px', marginRight: '10px' }}>Add Teacher</button>
        <button onClick={handleUpdateTeacher} style={{ padding: '10px', marginRight: '10px' }}>Update Teacher</button>
        <button onClick={handleDeleteTeacher} style={{ padding: '10px' }}>Remove Teacher</button>
      </div>

      {/* Display Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Add Teacher Form */}
      {action === "add" && (
        <div>
          <h4>Add New Teacher</h4>
          <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
            <input type="text" placeholder="Teacher ID" value={formData.teacher_id}
              onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <input type="text" placeholder="Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <input type="text" placeholder="Password" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <input type="text" placeholder="Subject" value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <input type="text" placeholder="Contact Info" value={formData.contact_info}
              onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <input type="text" placeholder="Address" value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>Add Teacher</button>
          </form>
        </div>
      )}

      {/* Update Teacher Form */}
      {action === "update" && (
        <div>
          <h4>Update Teacher</h4>
          <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
            <input type="text" placeholder="Teacher ID" value={formData.teacher_id}
              onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <input type="text" placeholder="Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <input type="password" placeholder="Password" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <input type="text" placeholder="Subject" value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <input type="text" placeholder="Contact Info" value={formData.contact_info}
              onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <input type="text" placeholder="Address" value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>Update Teacher</button>
          </form>
        </div>
      )}

      {/* Remove Teacher Form */}
      {action === "remove" && (
        <div>
          <h4>Remove Teacher</h4>
          <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
            <input type="text" placeholder="Teacher ID" value={formData.teacher_id}
              onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })} required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>Remove Teacher</button>
          </form>
        </div>
      )}

      {/* Teachers Table */}
      <h4>Teachers List</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Subject</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Contact Info</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Address</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.teacher_id} style={{ cursor: 'pointer' }}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{teacher.teacher_id}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{teacher.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{teacher.subject}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{teacher.contact_info}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{teacher.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
