import React, { useState, useEffect } from 'react';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentName: '',
    studentID: '',
    password: '',
    age: '',
    gender: '',
    standard: '',
    section: '',
    contactNumber: '',
    email: '',
    address: '',
    guardianName: '',
    guardianContact: '',
    bloodGroup: '',
    dateOfBirth: '',
  });
  const [action, setAction] = useState(null); // add, update, remove
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState(''); // To display success or error messages
  const [showPopup, setShowPopup] = useState(false); // For showing success/error popup
  const [popupMessage, setPopupMessage] = useState(''); // Popup message
  const [popupType, setPopupType] = useState(''); // success or error type

  // Fetch the students from the server (simulated with mock data)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (action === 'add') {
        response = await fetch('http://localhost:5000/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else if (action === 'update') {
        response = await fetch(`http://localhost:5000/api/students/${formData.studentID}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else if (action === 'remove') {
        response = await fetch(`http://localhost:5000/api/students/${formData.studentID}`, {
          method: 'DELETE',
        });
      }

      if (response.ok) {
        setPopupType('success');
        setPopupMessage(`${action.charAt(0).toUpperCase() + action.slice(1)} successful!`);
        setShowPopup(true);
        // Re-fetch students after the operation
        const data = await fetch('http://localhost:5000/api/students').then((res) => res.json());
        setStudents(data);
      } else {
        setPopupType('error');
        setPopupMessage(`${action.charAt(0).toUpperCase() + action.slice(1)} failed!`);
        setShowPopup(true);
      }

      setAction(null); // Reset the action
      setSelectedStudent(null); // Reset selected student
      setFormData({}); // Reset the form data
    } catch (error) {
      console.error('Error during form submission:', error);
      setPopupType('error');
      setPopupMessage('An error occurred during the operation.');
      setShowPopup(true);
    }
  };

  const handleUpdateStudent = (student) => {
    setSelectedStudent(student);
    setFormData(student);
    setAction('update');
  };

  const handleDeleteStudent = (studentID) => {
    setFormData({ studentID });
    setAction('remove');
  };

  const handleAddStudent = () => {
    setFormData({
      studentName: '',
      studentID: '',
      password: '',
      age: '',
      gender: '',
      standard: '',
      section: '',
      contactNumber: '',
      email: '',
      address: '',
      guardianName: '',
      guardianContact: '',
      bloodGroup: '',
      dateOfBirth: '',
    });
    setAction('add');
    setMessage('');
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h2>Manage Students</h2>

      {/* Action Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleAddStudent} style={{ padding: '10px 20px' }}>
          Add Student
        </button>
      </div>

      {/* Add/Update/Remove Student Forms */}
      {action && (
        <div>
          <h4>{action === 'add' ? 'Add Student' : action === 'update' ? 'Update Student' : 'Remove Student'}</h4>
          <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
            {action !== 'remove' && (
              <>
                <input
                  type="text"
                  placeholder="Student Name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  placeholder="Student ID"
                  value={formData.studentID}
                  onChange={(e) => setFormData({ ...formData, studentID: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  placeholder="Standard"
                  value={formData.standard}
                  onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  placeholder="Section"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <textarea
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  placeholder="Guardian Name"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  placeholder="Guardian Contact"
                  value={formData.guardianContact}
                  onChange={(e) => setFormData({ ...formData, guardianContact: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="text"
                  placeholder="Blood Group"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
              </>
            )}
            {action === 'remove' && (
              <input
                type="text"
                placeholder="Student ID"
                value={formData.studentID}
                onChange={(e) => setFormData({ ...formData, studentID: e.target.value })}
                required
                style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
              />
            )}
            <button type="submit" style={{ padding: '10px 20px' }}>
              {action === 'add' ? 'Add Student' : action === 'update' ? 'Update Student' : 'Remove Student'}
            </button>
          </form>
        </div>
      )}

      {/* Students Table */}
      <div>
        <h4>Students List</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentID}>
                <td>{student.studentID}</td>
                <td>{student.studentName}</td>
                <td>
                  <button onClick={() => handleUpdateStudent(student)} style={{ padding: '5px', marginRight: '10px' }}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteStudent(student.studentID)} style={{ padding: '5px' }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Success/Error Popup */}
      {showPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <div style={{ fontSize: '30px', marginBottom: '20px' }}>
              {popupType === 'success' ? '✔' : '✖'}
            </div>
            <p>{popupMessage}</p>
            <button onClick={closePopup} style={{ padding: '10px 20px', backgroundColor: 'red', color: '#fff' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
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
};

export default ManageStudents;
