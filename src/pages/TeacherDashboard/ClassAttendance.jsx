import React, { useState, useEffect } from 'react';

const MentorAttendanceTracking = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [attendancePercentage, setAttendancePercentage] = useState(null); // Attendance percentage
  const [students, setStudents] = useState([]); // List of students to show

  // Sample class and student data (to simulate mentor status and student data)
  const teacherClasses = ['Class 1A', 'Class 1B', 'Class 2A']; // List of classes the teacher is assigned as a mentor
  const allClasses = {
    'Class 1A': [
      { regNum: 'S001', name: 'John Doe', isPresent: true },
      { regNum: 'S002', name: 'Jane Smith', isPresent: false },
    ],
    'Class 1B': [
      { regNum: 'S003', name: 'Alice Brown', isPresent: true },
      { regNum: 'S004', name: 'Bob White', isPresent: true },
    ],
    'Class 2A': [
      { regNum: 'S005', name: 'Charlie Green', isPresent: false },
      { regNum: 'S006', name: 'Daisy Blue', isPresent: true },
    ],
    'Class 2B': [
      { regNum: 'S007', name: 'Eve Black', isPresent: true },
      { regNum: 'S008', name: 'Frank Gray', isPresent: false },
    ],
  };

  // Simulate fetching mentor status
  useEffect(() => {
    // Assuming a teacher has a mentor status, we check if they are assigned as a mentor
    const teacherAssignedClasses = teacherClasses; // Replace this with API or database call
    if (teacherAssignedClasses.length > 0) {
      setStudents(allClasses[teacherAssignedClasses[0]]); // Set students for the first class as an example
    }
  }, []);

  // Handle selecting class
  const handleClassChange = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);
    setAttendancePercentage(null); // Reset attendance percentage
    setStudents(allClasses[selected] || []); // Set students for the selected class
  };

  // Calculate attendance percentage
  const calculateAttendancePercentage = () => {
    const totalStudents = students.length;
    const presentCount = students.filter(student => student.isPresent).length;
    return totalStudents > 0 ? ((presentCount / totalStudents) * 100).toFixed(2) : 0;
  };

  // Handle form submission (but no submission since it's view-only)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClass) {
      alert('Please select a class.');
      return;
    }
    const percentage = calculateAttendancePercentage();
    setAttendancePercentage(percentage);
  };

  return (
    <section id="mentor-attendance-tracking" style={styles.section}>
      <h3>Mentor Attendance Tracking</h3>
      <p>Track students' attendance for the class you mentor here.</p>

      {/* If the teacher is a mentor */}
      {teacherClasses.length > 0 ? (
        <>
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Class selection dropdown */}
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="class-select">
                Select Class:
              </label>
              <select
                id="class-select"
                value={selectedClass}
                onChange={handleClassChange}
                style={styles.input}
              >
                <option value="">-- Select a Class --</option>
                {teacherClasses.map((classItem, index) => (
                  <option key={index} value={classItem}>
                    {classItem}
                  </option>
                ))}
              </select>
            </div>

            {/* Show attendance details for the selected class */}
            {selectedClass && students.length > 0 && (
              <div style={styles.formGroup}>
                <h4>Attendance</h4>
                {students.map((student) => (
                  <div key={student.regNum} style={styles.checkboxGroup}>
                    <span style={styles.checkboxLabel}>
                      {student.name} (Reg No: {student.regNum}) - {student.isPresent ? 'Present' : 'Absent'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Submit button to calculate attendance percentage */}
            <button type="submit" style={styles.submitButton}>
              View Attendance Percentage
            </button>
          </form>

          {/* Show attendance percentage */}
          {attendancePercentage !== null && (
            <div style={styles.attendancePercentage}>
              <h4>Attendance Percentage: {attendancePercentage}%</h4>
            </div>
          )}
        </>
      ) : (
        <p>You are not assigned as a mentor to any class. Please contact the admin.</p>
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
    maxWidth: '900px',
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
    marginBottom: '8px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  checkboxLabel: {
    fontSize: '14px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#18bc9c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  attendancePercentage: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    fontSize: '16px',
  },
};

export default MentorAttendanceTracking;
