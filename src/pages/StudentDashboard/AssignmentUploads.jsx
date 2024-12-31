import React, { useState } from 'react';

const AssignmentUpload = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    className: '',
    subjectName: '',
    assignmentTitle: '',
  });
  const [file, setFile] = useState(null);
  const [popup, setPopup] = useState({ visible: false, message: '', success: false });
  const [filters, setFilters] = useState({ className: '', subjectName: '' });
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { studentId, className, subjectName, assignmentTitle } = formData;

    if (!studentId || !className || !subjectName || !assignmentTitle || !file) {
      setPopup({
        visible: true,
        message: 'All fields are required, including a file.',
        success: false,
      });
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('studentId', studentId);
    formDataObj.append('className', className);
    formDataObj.append('subjectName', subjectName);
    formDataObj.append('assignmentTitle', assignmentTitle);
    formDataObj.append('file', file);

    try {
      const response = await fetch('http://localhost:5002/studentAssignments/upload', {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();

      if (response.ok) {
        setPopup({
          visible: true,
          message: result.message,
          success: true,
        });
        setFormData({ studentId: '', className: '', subjectName: '', assignmentTitle: '' });
        setFile(null);
      } else {
        setPopup({
          visible: true,
          message: result.message,
          success: false,
        });
      }
    } catch (error) {
      setPopup({
        visible: true,
        message: 'Error uploading assignment. Please try again later.',
        success: false,
      });
    }
  };

  const closePopup = () => {
    setPopup({ visible: false, message: '', success: false });
  };

  const fetchAssignments = async () => {
    const { className, subjectName } = filters;

    if (!className || !subjectName) {
      setError('Both className and subjectName are required.');
      setAssignments([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5002/assignments?className=${className}&subjectName=${subjectName}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error fetching assignments.');
        setAssignments([]);
      } else {
        setAssignments(data);
        setError('');
      }
    } catch (error) {
      setError('Error fetching assignments. Please try again later.');
      setAssignments([]);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h3>Fetch Assignments</h3>
      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Class Name</label>
          <input
            type="text"
            name="className"
            value={filters.className}
            onChange={handleFilterChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Subject Name</label>
          <input
            type="text"
            name="subjectName"
            value={filters.subjectName}
            onChange={handleFilterChange}
            style={styles.input}
          />
        </div>

        <button onClick={fetchAssignments} style={styles.submitButton}>
          Fetch Assignments
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div>
        {assignments.length > 0 && (
          <div style={styles.assignmentList}>
            <h4>Assignments</h4>
            <ol>
              {assignments.map((assignment, index) => (
                <li key={index}>
                  <strong>Question:</strong> {assignment.assignmentQuestion}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <hr style={{ margin: '20px 0' }} />

      <h3>Assignment Upload</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Class Name</label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Subject Name</label>
          <input
            type="text"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Assignment Title</label>
          <input
            type="text"
            name="assignmentTitle"
            value={formData.assignmentTitle}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Assignment</label>
          <input
            type="file"
            onChange={handleFileChange}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Submit Assignment
        </button>
      </form>

      {popup.visible && (
        <div style={{ ...styles.popupOverlay, ...styles.blur }}>
          <div style={styles.popup}>
            <div style={popup.success ? styles.successIcon : styles.errorIcon}>
              {popup.success ? '✔️' : '❌'}
            </div>
            <p>{popup.message}</p>
            <button onClick={closePopup} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    border: '1px solid #ddd',
    maxWidth: '600px',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  blur: {
    backdropFilter: 'blur(5px)',
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '300px',
  },
  successIcon: {
    fontSize: '30px',
    color: 'green',
    marginBottom: '10px',
  },
  errorIcon: {
    fontSize: '30px',
    color: 'red',
    marginBottom: '10px',
  },
  closeButton: {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  assignmentList: {
    marginTop: '20px',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default AssignmentUpload;
