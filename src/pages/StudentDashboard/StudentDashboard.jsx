import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import viewTimetableIcon from '/src/assets/Timetable.png';
import studyMaterialsIcon from '/src/assets/StudyMaterials.png';
import notificationsIcon from '/src/assets/Notifications.png';
import studentProfileIcon from '/src/assets/StudentProfile.png';
import classMessagesIcon from '/src/assets/ClassMessages.png';
import attendanceIcon from '/src/assets/Attendance.png';
import eventsIcon from '/src/assets/events.png';
import awardsIcon from '/src/assets/awards.png';
import feesIcon from '/src/assets/Fees.png';
import assignmentsIcon from '/src/assets/Assignments.png';
import marksIcon from '/src/assets/marks.png';
import logo from '/src/assets/logo.png';
import ViewTimetable from './ViewTimetable';
import StudyMaterials from './StudyMaterials';
import AttendanceComponent from './Attendance';
import StudentProfile from './StudentProfile';
import AssignmentUploads from './AssignmentUploads';
import EventsComponent from './Events';
import ClassMessages from './ClassMessage';
import Notifications from './Notifications';
import AwardsWon from './AwardsWon';
import FeesPayment from './FeesPayments';
import MarksView from './MarksView';

const StudentDashboard = ({ studentId }) => {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [studentInfo, setStudentInfo] = useState({});
  const [loading, setLoading] = useState(false); // New state for loading
  const [contentLoaded, setContentLoaded] = useState(false); // New state to control content fade-in
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/student/${studentId}`);
        setStudentInfo(res.data); // Set the student info
      } catch (err) {
        console.error('Failed to fetch student info:', err);
      }
    };

    fetchStudentInfo();
  }, [studentId]);

  const studentMenus = [
    { name: 'View Timetable', icon: viewTimetableIcon },
    { name: 'Study Materials', icon: studyMaterialsIcon },
    { name: 'Attendance', icon: attendanceIcon },
    { name: 'Student Profile', icon: studentProfileIcon },
    { name: 'Assignment Uploads', icon: assignmentsIcon },
    { name: 'Events', icon: eventsIcon },
    { name: 'Class Messages', icon: classMessagesIcon },
    { name: 'Notifications', icon: notificationsIcon },
    { name: 'Awards Won', icon: awardsIcon },
    { name: 'Fees Payment', icon: feesIcon },
    { name: 'Marks View', icon: marksIcon },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  const handleMenuClick = (menuName) => {
    setLoading(true); // Start loading animation
    setSelectedMenu(menuName);
    setContentLoaded(false); // Reset content fade-in state
    setTimeout(() => {
      setLoading(false); // Stop loading animation
      setContentLoaded(true); // Trigger content fade-in
    }, 1500); // Loading delay (1.5 seconds)
  };

  return (
    <div style={styles.dashboard}>
      <header style={styles.mainHeader}>
        <div style={styles.headerLeft}>
          <img src={logo} alt="School Logo" style={styles.logo} />
        </div>
        <nav style={styles.navbar}>
          <ul style={styles.navLinks}>
            <li><a href="#profile" style={styles.navLink}>Profile</a></li>
            <li><a href="#notifications" style={styles.navLink}>Notifications</a></li>
            <li><a href="#messages" style={styles.navLink}>Messages</a></li>
          </ul>
        </nav>
        <div style={styles.headerRight}>
          <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div style={styles.dashboardHeader}>
        <div style={styles.studentInfo}>
          <h1 style={styles.studentName}>Welcome, {studentInfo.name}</h1>
        </div>
        <nav style={styles.dashboardNav}>
          <ul style={styles.navList}>
            {studentMenus.map((menu, index) => (
              <li
                key={index}
                style={{
                  ...styles.navItem,
                  backgroundColor: selectedMenu === menu.name ? '#cfe2ff' : 'transparent',
                  transform: selectedMenu === menu.name ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: selectedMenu === menu.name ? '2px 2px 15px gray' : 'none',
                }}
                onClick={() => handleMenuClick(menu.name)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '1px 0px 10px gray';
                  e.currentTarget.style.borderRadius = '5px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = selectedMenu === menu.name ? '#f0f0f0' : 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {menu.icon && <img src={menu.icon} alt={`${menu.name} icon`} style={styles.icon} />}
                {menu.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div style={styles.dashboardContent}>
        <h2>Student Dashboard</h2>
        <p>Welcome to the Student's dashboard. You can view your timetable, study materials, assignments, and more.</p>
        
        {loading ? (
          <div style={styles.loadingSpinner}></div> // Display the spinner during loading
        ) : (
          <div
            style={{
              ...styles.contentContainer,
              opacity: contentLoaded ? 1 : 0, // Fade-in effect
              transition: 'opacity 1s ease', // Smooth transition for opacity
            }}
          >
            {selectedMenu === 'View Timetable' && <ViewTimetable studentId={studentId} />}
            {selectedMenu === 'Study Materials' && <StudyMaterials />}
            {selectedMenu === 'Attendance' && <AttendanceComponent studentId={studentId} />}
            {selectedMenu === 'Student Profile' && <StudentProfile />}
            {selectedMenu === 'Assignment Uploads' && <AssignmentUploads />}
            {selectedMenu === 'Events' && <EventsComponent />}
            {selectedMenu === 'Class Messages' && <ClassMessages />}
            {selectedMenu === 'Notifications' && <Notifications />}
            {selectedMenu === 'Awards Won' && <AwardsWon />}
            {selectedMenu === 'Fees Payment' && <FeesPayment />}
            {selectedMenu === 'Marks View' && <MarksView studentId={studentId} />}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Poppins', sans-serif",
    backgroundImage: `url('/src/assets/student-portal2.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontWeight:'500',
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#ffffff',
    padding: '10px 20px',
    position: 'sticky',
    top: 0,
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
    background: 'Blue',
    color: '#fff',
    border: 'none',
    padding: '15px 35px',
    borderRadius: '4px',
    fontWeight:'600',
    cursor: 'pointer',
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 0',
  },
  studentInfo: {
    flex: 1,
  },
  dashboardNav: {
    flex: 1,
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
  },
  icon: {
    width: '40px',
    height: '40px',
    marginBottom: '5px',
  },
  dashboardContent: {
    marginTop: '20px',
  },
  contentContainer: {
    opacity: 0, // Initially hidden
  },
  loadingSpinner: {
    margin: '50px auto',
    border: '5px solid #f3f3f3', 
    borderTop: '5px solid #3498db', 
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default StudentDashboard;
