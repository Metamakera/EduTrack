import React, { useState } from 'react';

const MarksView = () => {
  const [studentId, setStudentId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [marksData, setMarksData] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/get-marks?studentId=${studentId}&subjectName=${subjectName}`
      );
      const data = await response.json();

      if (response.ok) {
        setMarksData(data.data); // Set fetched marks data
        setError('');
      } else {
        setError(data.message || 'Failed to fetch marks');
      }
    } catch (err) {
      setError('Error fetching data');
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>View Marks</h3>
      <p style={styles.subheading}>Enter Student ID and Subject Name to view marks and grades.</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.submitButton}>
          Fetch Marks
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}

      {marksData.length > 0 && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Term</th>
                <th style={styles.tableHeader}>Marks</th>
                <th style={styles.tableHeader}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((mark, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableData}>{mark.term}</td>
                  <td style={styles.tableData}>{mark.marks}</td>
                  <td style={styles.tableData}>{mark.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  subheading: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    width: '100%',
    boxSizing: 'border-box',
  },
  submitButton: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#18bc9c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
  },
  submitButtonHover: {
    backgroundColor: '#16a085',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '16px',
  },
  tableContainer: {
    overflowX: 'auto',
    marginTop: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    backgroundColor: '#18bc9c',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.3s ease',
  },
  tableRowHover: {
    backgroundColor: '#f1f1f1',
  },
  tableData: {
    padding: '12px',
    fontSize: '16px',
    textAlign: 'left',
    color: '#333',
  },
};

export default MarksView;
