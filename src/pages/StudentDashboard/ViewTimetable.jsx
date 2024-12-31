import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewTimetable = () => {
  const [weekTimetable, setWeekTimetable] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(''); // For entering student ID

  // Fetch timetable based on the entered student ID
  const fetchTimetable = async () => {
    if (!studentId) {
      setError('Please enter a valid student ID.');
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    console.log(`Fetching timetable for student ID: ${studentId}`);

    try {
      const res = await axios.get(`http://localhost:5000/timetable/${studentId}`);
      console.log('Response:', res.data);
      setWeekTimetable(res.data);
    } catch (err) {
      console.error('Error fetching timetable:', err);
      setError('Failed to fetch timetable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Enter Student ID to Fetch Timetable</h3>
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Enter student ID"
        style={styles.input}
      />
      <button onClick={fetchTimetable} style={styles.button}>Fetch Timetable</button>

      {loading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && Object.keys(weekTimetable).length > 0 && (
        <div>
          <h3>Your Weekly Timetable</h3>
          <p>View your timetable with timings as the header and days as rows below.</p>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Day/Time</th>
                {weekTimetable.Monday && weekTimetable.Monday.map((slot, index) => (
                  <th style={styles.th} key={index}>{slot.time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Monday</td>
                {weekTimetable.Monday && weekTimetable.Monday.map((slot, index) => (
                  <td style={styles.td} key={index}>{slot.subject || 'TBD'}</td>
                ))}
              </tr>
              <tr>
                <td style={styles.td}>Tuesday</td>
                {weekTimetable.Tuesday && weekTimetable.Tuesday.map((slot, index) => (
                  <td style={styles.td} key={index}>{slot.subject || 'TBD'}</td>
                ))}
              </tr>
              <tr>
                <td style={styles.td}>Wednesday</td>
                {weekTimetable.Wednesday && weekTimetable.Wednesday.map((slot, index) => (
                  <td style={styles.td} key={index}>{slot.subject || 'TBD'}</td>
                ))}
              </tr>
              <tr>
                <td style={styles.td}>Thursday</td>
                {weekTimetable.Thursday && weekTimetable.Thursday.map((slot, index) => (
                  <td style={styles.td} key={index}>{slot.subject || 'TBD'}</td>
                ))}
              </tr>
              <tr>
                <td style={styles.td}>Friday</td>
                {weekTimetable.Friday && weekTimetable.Friday.map((slot, index) => (
                  <td style={styles.td} key={index}>{slot.subject || 'TBD'}</td>
                ))}
              </tr>
              <tr>
                <td style={styles.td}>Saturday</td>
                {weekTimetable.Saturday && weekTimetable.Saturday.map((slot, index) => (
                  <td style={styles.td} key={index}>{slot.subject || 'TBD'}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '80%',
    margin: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
  },
  td: {
    padding: '15px',
    borderBottom: '5px solid #ddd',
    textAlign: 'left',
    fontweight:'800',
  },
  button: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  input: {
    padding: '10px',
    width: '300px',
    marginTop: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  error: {
    color: 'red',
  }
};

export default ViewTimetable;
