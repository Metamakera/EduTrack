import React, { useState } from 'react';
import axios from 'axios';

const StudentInfo = () => {
  const [studentID, setStudentID] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');

  const fetchStudentInfo = async () => {
    setError('');
    setStudentData(null);
    try {
      const response = await axios.get(`http://localhost:5000/student/${studentID}`);
      setStudentData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Student not found');
      } else {
        setError('Failed to fetch student information');
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="studentID" style={{ marginRight: '10px' }}>Enter Student ID:</label>
        <input
          id="studentID"
          type="text"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          placeholder="e.g., S2"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={fetchStudentInfo} style={{ padding: '5px 10px', cursor: 'pointer' }}>Fetch Info</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {studentData && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
          <h2>Student Details</h2>
          <p><strong>Name:</strong> {studentData.studentName}</p>
          <p><strong>Student ID:</strong> {studentData.studentID}</p>
          <p><strong>Age:</strong> {studentData.age}</p>
          <p><strong>Gender:</strong> {studentData.gender}</p>
          <p><strong>Class:</strong> {studentData.standard} - {studentData.section}</p>
          <p><strong>Contact Number:</strong> {studentData.contactNumber}</p>
          <p><strong>Email:</strong> {studentData.email}</p>
          <p><strong>Address:</strong> {studentData.address}</p>
          <p><strong>Blood Group:</strong> {studentData.bloodGroup}</p>
          <p><strong>Date of Birth:</strong> {studentData.dateOfBirth}</p>
        </div>
      )}
    </div>
  );
};

export default StudentInfo;
