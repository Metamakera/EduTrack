import React, { useState } from 'react';

const MarksUpload = () => {
  const [formData, setFormData] = useState({
    teacherId: '',
    studentId: '',
    subjectName: '',
    marks: '',
    grade: '',
    term: '',  // Added term field
  });
  const [popup, setPopup] = useState(null); // Popup state for success/failure messages
  const [loading, setLoading] = useState(false); // To track loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.teacherId || !formData.studentId || !formData.subjectName || !formData.marks || !formData.grade || !formData.term) {
      alert('Please fill in all the fields');
      return;
    }

    setLoading(true); // Set loading state to true while submitting
    try {
      const response = await fetch('http://localhost:5000/add-marks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setPopup({ type: 'success', message: 'Marks uploaded successfully!' });
        setFormData({
          teacherId: '',
          studentId: '',
          subjectName: '',
          marks: '',
          grade: '',
          term: '',  // Reset term field
        });
      } else {
        setPopup({ type: 'failure', message: 'Error uploading marks: ' + result.error });
      }
    } catch (error) {
      setPopup({ type: 'failure', message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false); // Reset loading state
      // Hide popup after 2 seconds
      setTimeout(() => setPopup(null), 2000);
    }
  };

  return (
    <section id="marks-upload" style={styles.section}>
      <h3>Marks Upload</h3>
      <p>Upload students' marks and grades for their respective subjects.</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="teacherId" style={styles.label}>Teacher ID</label>
          <input
            type="text"
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="studentId" style={styles.label}>Student ID</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="subjectName" style={styles.label}>Subject Name</label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="marks" style={styles.label}>Marks</label>
          <input
            type="number"
            id="marks"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            style={styles.input}
            required
            min="0"
            max="100"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="grade" style={styles.label}>Grade</label>
          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="term" style={styles.label}>Term</label>
          <input
            type="text"
            id="term"
            name="term"
            value={formData.term}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Marks'}
          </button>
        </div>
      </form>

      {/* Popup for Success/Failure */}
      {popup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <span style={popup.type === 'success' ? styles.successIcon : styles.failureIcon}>
              {popup.type === 'success' ? '✔' : '✖'}
            </span>
            <p>{popup.message}</p>
          </div>
        </div>
      )}
    </section>
  );
};

const styles = {
  section: {
    opacity: 0,
    animation: 'fadeIn 1s forwards',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border 0.3s ease',
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
  },
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
    padding: '30px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  successIcon: {
    color: 'green',
    fontSize: '30px',
  },
  failureIcon: {
    color: 'red',
    fontSize: '30px',
  },
};

export default MarksUpload;
