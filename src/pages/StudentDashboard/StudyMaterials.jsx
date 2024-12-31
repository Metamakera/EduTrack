import React, { useState } from 'react';
import axios from 'axios';

const StudyMaterials = () => {
  const [className, setClassName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [materials, setMaterials] = useState([]);
  const [message, setMessage] = useState('');

  // Handle form inputs
  const handleClassChange = (e) => setClassName(e.target.value);
  const handleSubjectChange = (e) => setSubjectName(e.target.value);

  // Fetch materials
  const handleFetchMaterials = async (e) => {
    e.preventDefault();

    if (!className || !subjectName) {
      setMessage('Class name and subject name are required!');
      setMaterials([]);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5002/get-materials', {
        params: { className, subjectName },
      });

      setMaterials(response.data);
      setMessage(response.data.length ? 'Materials fetched successfully!' : 'No materials found.');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error fetching materials';
      setMessage(errorMsg);
      setMaterials([]);
    }
  };

  // Download material
  const handleDownload = async (id, fileName) => {
    try {
      const response = await axios.get(`http://localhost:5002/download-material/${id}`, {
        responseType: 'blob', // Receive binary data
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      setMessage('File downloaded successfully!');
    } catch (error) {
      setMessage('Error downloading file!');
    }
  };

  return (
    <div style={styles.container}>
      <h3>Study Materials</h3>
      <p>Enter class and subject to fetch available study materials.</p>

      <form onSubmit={handleFetchMaterials} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="className" style={styles.label}>
            Class Name:
          </label>
          <input
            type="text"
            id="className"
            value={className}
            onChange={handleClassChange}
            style={styles.input}
            placeholder="Enter class name"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="subjectName" style={styles.label}>
            Subject Name:
          </label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={handleSubjectChange}
            style={styles.input}
            placeholder="Enter subject name"
          />
        </div>

        <button type="submit" style={styles.fetchButton}>
          Fetch Materials
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}

      {materials.length > 0 && (
        <div>
          <h4>Available Files</h4>
          <ul style={styles.fileList}>
            {materials.map((material) => (
              <li key={material.id} style={styles.fileItem}>
                <span>{material.fileName}</span>
                <button
                  onClick={() => handleDownload(material.id, material.fileName)}
                  style={styles.downloadButton}
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Inline styles for the components
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: '600',
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    padding: '10px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    color: '#555',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#007bff',
    outline: 'none',
  },
  fetchButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  fetchButtonHover: {
    backgroundColor: '#0056b3',
  },
  message: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#e74c3c',
    fontWeight: '500',
  },
  successMessage: {
    color: '#2ecc71',
  },
  fileList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '20px',
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ddd',
    borderRadius: '6px',
    marginBottom: '10px',
    transition: 'background-color 0.3s ease',
  },
  fileItemHover: {
    backgroundColor: '#f1f1f1',
  },
  fileName: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
  },
  downloadButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  downloadButtonHover: {
    backgroundColor: '#218838',
  },
};


export default StudyMaterials;
