import React, { useState, useEffect } from 'react';

const AttendanceTracking = () => {
  const [teacherId, setTeacherId] = useState('');
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(''); // 'success' or 'failure'

  const fetchStudents = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/get-students?className=${className}`);
      const data = await response.json();

      if (response.ok) {
        setStudents(data.students || []);
        setAttendance({});
      } else {
        setError(data.error || 'Failed to fetch students');
        setStudents([]);
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const submitAttendance = async () => {
    if (Object.keys(attendance).length === 0) {
      alert('Please mark attendance for students.');
      return;
    }

    if (!date) {
      alert('Please select a date.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/mark-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacherId,
          className,
          students: Object.entries(attendance).map(([studentId, status]) => ({
            studentId,
            attendance: status,
          })),
          date,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPopupMessage('Attendance marked successfully!');
        setPopupType('success');
        setShowPopup(true);
      } else {
        setPopupMessage(data.error || 'Failed to mark attendance');
        setPopupType('failure');
        setShowPopup(true);
      }
    } catch (err) {
      setPopupMessage('Error submitting attendance');
      setPopupType('failure');
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000); // Hide the popup after 2 seconds

      return () => clearTimeout(timer); // Cleanup timeout on component unmount or when popup is closed
    }
  }, [showPopup]);

  return (
    <div style={styles.container}>
      <h3>Class Attendance</h3>
      <form onSubmit={fetchStudents} style={styles.form}>
        <input
          type="text"
          placeholder="Teacher ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? 'Loading...' : 'Get Students'}
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}

      {students.length > 0 && (
        <div>
          <h4>Mark Attendance</h4>
          <form style={styles.attendanceForm}>
            {students.map((student) => (
              <div key={student.studentId} style={styles.studentItem}>
                <span style={styles.studentName}>
                  {student.studentName} ({student.studentId})
                </span>
                <div style={styles.toggleContainer}>
                  <button
                    type="button"
                    onClick={() => handleAttendanceChange(student.studentId, 'present')}
                    style={{
                      ...styles.toggleButton,
                      backgroundColor: attendance[student.studentId] === 'present' ? '#28a745' : '#f8f9fa',
                    }}
                  >
                    Present
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAttendanceChange(student.studentId, 'absent')}
                    style={{
                      ...styles.toggleButton,
                      backgroundColor: attendance[student.studentId] === 'absent' ? '#dc3545' : '#f8f9fa',
                    }}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={submitAttendance} style={styles.submitButton} disabled={loading}>
              {loading ? 'Submitting...' : 'Upload Attendance'}
            </button>
          </form>
        </div>
      )}

      {/* Popup for Success/Failure */}
      {showPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <span style={styles.closeBtn} onClick={closePopup}>&times;</span>
            <div style={popupType === 'success' ? styles.successMessage : styles.failureMessage}>
              {popupType === 'success' ? '✔️' : '❌'}
              <span>{popupMessage}</span>
            </div>
          </div>
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
    backgroundColor: '#f7f9fc',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
    width: '100%',
  },
  submitButton: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
  },
  error: {
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '16px',
  },
  attendanceForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  studentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  studentName: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  toggleContainer: {
    display: 'flex',
    gap: '10px',
  },
  toggleButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#333',
    transition: 'background-color 0.3s ease',
  },
  // Popup Styles
  popup: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  popupContent: {
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#333',
  },
  successMessage: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    color: '#28a745',
    fontWeight: 'bold',
  },
  failureMessage: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    color: '#dc3545',
    fontWeight: 'bold',
  },
};

export default AttendanceTracking;
