import React, { useState } from "react";
import axios from "axios";

const MaterialsUpload = () => {
  const [formData, setFormData] = useState({
    subjectName: "",
    className: "",
    classRoom: "",
  });

  const [file, setFile] = useState(null);
  const [fileSizeError, setFileSizeError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Track whether to show the confirmation popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Track success message visibility

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 4 * 1024 * 1024) {
      setFileSizeError("File size must be less than 4MB.");
      setFile(null);
    } else {
      setFileSizeError("");
      setFile(selectedFile);
    }
  };

  const handleUploadMaterial = async (e) => {
    e.preventDefault();

    if (!formData.className || !formData.subjectName || !file) {
      setUploadStatus("All fields are required!");
      return;
    }

    setShowPopup(true); // Show confirmation popup before upload
  };

  const confirmUpload = async () => {
    setShowPopup(false); // Close the confirmation popup

    const materialData = new FormData();
    materialData.append("className", formData.className);
    materialData.append("subjectName", formData.subjectName);
    materialData.append("classRoom", formData.classRoom); // Optional, depending on backend
    materialData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5002/add-material",
        materialData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.message) {
        setUploadStatus(response.data.message);
      } else {
        setUploadStatus("Material uploaded successfully!");
        setShowSuccessPopup(true); // Show success popup
        setTimeout(() => setShowSuccessPopup(false), 2000); // Hide after 2 seconds
      }
    } catch (error) {
      setUploadStatus("Error uploading material!");
    }

    // Reset form
    setFormData({
      subjectName: "",
      className: "",
      classRoom: "",
    });
    setFile(null);
  };

  const cancelUpload = () => {
    setShowPopup(false); // Close the popup without uploading
  };

  return (
    <section id="materials-upload" style={styles.section}>
      <h3>Materials Upload</h3>
      <p>Upload study materials for students here.</p>

      <form onSubmit={handleUploadMaterial} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="subjectName" style={styles.label}>
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleFormChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="className" style={styles.label}>
            Class Name
          </label>
          <input
            type="text"
            id="className"
            name="className"
            value={formData.className}
            onChange={handleFormChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="file" style={styles.label}>
            Upload Material (PDF, DOC, etc.)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            style={styles.input}
            required
          />
          {fileSizeError && <p style={styles.errorText}>{fileSizeError}</p>}
        </div>

        <div style={styles.formGroup}>
          <button type="submit" style={styles.submitButton}>
            Upload Material
          </button>
        </div>
      </form>

      {uploadStatus && <p style={styles.uploadStatus}>{uploadStatus}</p>}

      {/* Popup Modal */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h4>Confirm Upload</h4>
            <p>Are you sure you want to upload this material?</p>
            <div style={styles.popupButtons}>
              <button onClick={confirmUpload} style={styles.confirmButton}>
                Yes, Upload
              </button>
              <button onClick={cancelUpload} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div style={styles.successPopup}>
          <div style={styles.successMessage}>
            <span style={styles.checkmark}>✔</span> Success!
          </div>
        </div>
      )}
    </section>
  );
};

const styles = {
  section: {
    opacity: 0,
    animation: "fadeIn 1s forwards",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  submitButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#18bc9c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
  uploadStatus: {
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  popupButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  confirmButton: {
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#18bc9c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  successPopup: {
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#18bc9c",
    color: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successMessage: {
    display: "flex",
    alignItems: "center",
  },
  checkmark: {
    fontSize: "24px",
    marginRight: "10px",
  },
};

export default MaterialsUpload;
