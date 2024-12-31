import React, { useState } from 'react';
import axios from 'axios';

const AttendanceLookup = () => {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAttendanceData(null);

    if (!studentId || !date) {
      setError('Please enter both Student ID and Date');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/get-student-attendance', {
        params: { studentId, date },
      });

      if (response.data) {
        setAttendanceData(response.data);
      }
    } catch (err) {
      console.error('Error fetching attendance:', err);
      setError(err.response ? err.response.data.error : 'Error fetching attendance data');
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Check Student Attendance</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="studentId" style={styles.label}>Student ID</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={styles.input}
            placeholder="Enter Student ID"
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label htmlFor="date" style={styles.label}>Date (YYYY-MM-DD)</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>Fetch Attendance</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {attendanceData && (
        <div style={styles.attendanceInfo}>
          <h4 style={styles.attendanceHeading}>Attendance Record</h4>
          <p style={styles.attendanceText}><strong>Attendance Status:</strong> {attendanceData.attendance}</p>
          <p style={styles.attendanceText}><strong>Date:</strong> {attendanceData.date}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    background: 'linear-gradient(135deg, #f1f1f1, #e0e0e0)',
    borderRadius: '10px',
    border: '1px solid #ccc',
    maxWidth: '500px',
    margin: '50px auto',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    letterSpacing: '0.5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border 0.3s ease',
  },
  inputFocus: {
    border: '1px solid #007BFF',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    width: '100%',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: '#d9534f',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '10px',
  },
  attendanceInfo: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  attendanceHeading: {
    fontSize: '20px',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  attendanceText: {
    fontSize: '16px',
    color: '#444',
  },
};

export default AttendanceLookup;
