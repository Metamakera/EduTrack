import React, { useState, useEffect } from 'react';
import MarksUpload from './MarksUpload';
import MaterialsUpload from './MaterialsUpload';
import Assignments from './Assignments';
import Timetable from './Timetable';
import AttendanceTracking from './AttendanceTracking';
import MentorAttendanceTracking from './ClassAttendance';
import AddStudent from './Addstudent';
import logo from '/src/assets/logo.png'; // Adjust the path to your logo
import ClassMessages from './ClassMessages'; // Corrected import to match component name

const TeacherDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token')); // Assuming the token is stored in localStorage
  const [isLoading, setIsLoading] = useState(false);

  const [hoveredItem, setHoveredItem] = useState(null); // State to track hover effect

  useEffect(() => {
    const name = localStorage.getItem('name'); // Fetch teacher's name
    const id = localStorage.getItem('teacher_id'); // Fetch teacher's ID

    if (name && id) {
      setTeacherName(name);  // Set the teacher's name to state
      setTeacherId(id);  // Set the teacher's ID to state
    } else {
      console.log('No teacher details found in localStorage');
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear localStorage and reset state
      localStorage.removeItem('teacher_name');
      localStorage.removeItem('teacher_id');
      localStorage.removeItem('token');
      setAccessToken(null);
      console.log('Logged out');
      window.location.href = '/login'; // Example redirect to login page
    }
  };

  const handleMenuClick = (section) => {
    setIsLoading(true);
    setSelectedSection('');
    setTimeout(() => {
      setSelectedSection(section);
      setIsLoading(false);
    }, 1000); // Simulating a delay for loading
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.mainHeader}>
        <div style={styles.headerLeft}>
          <img src={logo} alt="School Logo" style={styles.logo} />
        </div>
        <nav style={styles.navbar}>
          <ul style={styles.navLinks}>
            <li><a href="#notifications" style={styles.navLink}>Notifications</a></li>
            <li><a href="#messages" style={styles.navLink}>Messages</a></li>
          </ul>
        </nav>
        <div style={styles.headerRight}>
          <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div style={styles.dashboardContainer}>
        <div style={styles.sidebar}>
          <h2 style={styles.title}>Teacher Dashboard</h2>
          <ul style={styles.menuList}>
            <li
              style={hoveredItem === 'marks' ? { ...styles.menuItem, ...styles.menuItemHover } : selectedSection === 'marks' ? { ...styles.menuItem, ...styles.menuItemActive } : styles.menuItem}
              onClick={() => handleMenuClick('marks')}
              onMouseEnter={() => handleMouseEnter('marks')}
              onMouseLeave={handleMouseLeave}
            >
              Marks Upload
            </li>
            <li
              style={hoveredItem === 'materials' ? { ...styles.menuItem, ...styles.menuItemHover } : selectedSection === 'materials' ? { ...styles.menuItem, ...styles.menuItemActive } : styles.menuItem}
              onClick={() => handleMenuClick('materials')}
              onMouseEnter={() => handleMouseEnter('materials')}
              onMouseLeave={handleMouseLeave}
            >
              Materials Upload
            </li>
            <li
              style={hoveredItem === 'assignments' ? { ...styles.menuItem, ...styles.menuItemHover } : selectedSection === 'assignments' ? { ...styles.menuItem, ...styles.menuItemActive } : styles.menuItem}
              onClick={() => handleMenuClick('assignments')}
              onMouseEnter={() => handleMouseEnter('assignments')}
              onMouseLeave={handleMouseLeave}
            >
              Assignments
            </li>
            <li
              style={hoveredItem === 'timetable' ? { ...styles.menuItem, ...styles.menuItemHover } : selectedSection === 'timetable' ? { ...styles.menuItem, ...styles.menuItemActive } : styles.menuItem}
              onClick={() => handleMenuClick('timetable')}
              onMouseEnter={() => handleMouseEnter('timetable')}
              onMouseLeave={handleMouseLeave}
            >
              Time Table
            </li>
            <li
              style={hoveredItem === 'attendance' ? { ...styles.menuItem, ...styles.menuItemHover } : selectedSection === 'attendance' ? { ...styles.menuItem, ...styles.menuItemActive } : styles.menuItem}
              onClick={() => handleMenuClick('attendance')}
              onMouseEnter={() => handleMouseEnter('attendance')}
              onMouseLeave={handleMouseLeave}
            >
              Attendance Tracking
            </li>
            <li
              style={hoveredItem === 'add-student' ? { ...styles.menuItem, ...styles.menuItemHover } : selectedSection === 'add-student' ? { ...styles.menuItem, ...styles.menuItemActive } : styles.menuItem}
              onClick={() => handleMenuClick('add-student')}
              onMouseEnter={() => handleMouseEnter('add-student')}
              onMouseLeave={handleMouseLeave}
            >
              Add Student
            </li>
            <li
              style={hoveredItem === 'add-messages' ? { ...styles.menuItem, ...styles.menuItemHover } : selectedSection === 'add-messages' ? { ...styles.menuItem, ...styles.menuItemActive } : styles.menuItem}
              onClick={() => handleMenuClick('add-messages')}
              onMouseEnter={() => handleMouseEnter('add-messages')}
              onMouseLeave={handleMouseLeave}
            >
              Class Messages
            </li>
          </ul>
        </div>

        <div style={styles.content}>
          <header style={styles.dashboardHeader}>
            <div style={styles.facultyInfo}>
              <h1>{teacherName || 'Faculty Name'}</h1>
              <p>{teacherId || 'Faculty ID'}</p>
            </div>
          </header>
          <div style={styles.dashboardMain}>
            {isLoading ? (
              <div style={styles.loadingContainer}>
                <div style={styles.loader}></div>
                <p>Loading...</p>
              </div>
            ) : (
              <>
                {selectedSection === 'marks' && <MarksUpload />}
                {selectedSection === 'materials' && <MaterialsUpload />}
                {selectedSection === 'assignments' && <Assignments />}
                {selectedSection === 'timetable' && <Timetable />}
                {selectedSection === 'attendance' && <AttendanceTracking />}
                {selectedSection === 'mentor-attendance' && <MentorAttendanceTracking />}
                {selectedSection === 'add-student' && <AddStudent />}
                {selectedSection === 'add-messages' && <ClassMessages />}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2024 Your School. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',  // Ensure container takes full height of the screen
      backgroundImage: `url('/src/assets/teacher-portal4.jpg')`, // Background image added
      backgroundSize: 'cover', // Ensure the image covers the entire container
      backgroundPosition: 'center', // Center the image
      fontFamily: "'Poppins', sans-serif", // Apply Poppins here
      fontWeight:'500',
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#ffffff',
    padding: '15px 20px',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '350px',
    height: '100px',
    marginRight: '15px',
  },
  navbar: {
    flexGrow: 1,
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  navLink: {
    textDecoration: 'none',
    color: '#000',
    margin: '0 10px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  logoutButton: {
    background: 'blue',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '3px',
    cursor: 'pointer',
    fontWeight:'700',
    transition: 'background 0.3s ease',
  },
  dashboardContainer: {
    display: 'flex',
    flex: 1,
    marginTop: '100px',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    padding: '20px',
    transition: 'all 0.3s ease-in-out',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    borderBottom: '1px solid #7f8c8d',
    paddingBottom: '10px',
  },
  menuList: {
    listStyleType: 'none',
    padding: '0',
  },
  menuItem: {
    padding: '10px 15px',
    margin: '10px 0',
    cursor: 'pointer',
    borderRadius: '5px',
    textAlign: 'center',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  menuItemHover: {
    background: '#2980b9',  
    transform: 'scale(1.05)',
  },
  menuItemActive: {
    backgroundColor: '#2980b9',
    color: '#fff', // Ensures the text is readable in the active state
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: '20px',
    marginLeft: '270px', 
    background:'transparent',
  },
  dashboardHeader: {
    backgroundColor: '#ecf0f1',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  facultyInfo: {
    textAlign: 'center',
  },
  dashboardMain: {
    padding: '20px',
    backgroundColor: '#ecf0f1',
    borderRadius: '5px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loader: {
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
  },
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '10px 0',
    textAlign: 'center',
  },
};

export default TeacherDashboard;
