import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageUsers from './ManageUsers';
import ManageAnnouncements from './ManageAnnouncements';
import ManageEvents from './ManageEvents';
import logo from '/src/assets/logo.png';
import MessageForm from './ManageAnnouncements';
import AdminProfile from './AdminProfile';

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const menus = [
    { name: 'Manage Announcements' },
    { name: 'Manage Events' },
    { name: 'Manage Users' },
    { name: 'Settings' },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Manage Announcements':
        return <ManageAnnouncements />;
      case 'Manage Events':
        return <ManageEvents />;
      case 'Manage Users':
        return <ManageUsers />;
      case 'Messages':
        return <MessageForm />;
      case 'Profile':
        return <AdminProfile />;
      case 'Settings':
        return (
          <div>
            <h3>Settings</h3>
            <p>Adjust your settings here.</p>
          </div>
        );
      case 'Logout':
        handleLogout();
        return (
          <div>
            <h3>Logged Out</h3>
            <p>You have been logged out.</p>
          </div>
        );
      default:
        return (
          <div>
            <h3>Dashboard</h3>
            <p>Welcome to the Admin Dashboard!</p>
          </div>
        );
    }
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');
    if (isConfirmed) {
      navigate('/'); // Redirect to Home page after logout
    }
  };

  const handleMenuClick = (menuName) => {
    setLoading(true); // Start loading animation
    setTimeout(() => {
      setSelectedMenu(menuName);
      setLoading(false); // Stop loading animation after 1 second
    }, 1000); // Simulated loading time
  };

  return (
    <div style={styles.container}>
      <header style={styles.mainHeader}>
        <div style={styles.headerLeft}>
          <img src={logo} alt="School Logo" style={styles.logo} />
        </div>
        <nav style={styles.navbar}>
          <ul style={styles.navLinks}>
            <li>
              <a
                href="#profile"
                style={styles.navLink}
                onClick={() => handleMenuClick('Profile')}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#messages"
                style={styles.navLink}
                onClick={() => handleMenuClick('Messages')}
              >
                Messages
              </a>
            </li>
            <li>
              <a
                href="#settings"
                style={styles.navLink}
                onClick={() => handleMenuClick('Settings')}
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div style={styles.headerRight}>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div style={styles.dashboardContainer}>
        <div style={styles.sidebar}>
          <h2 style={styles.title}>Admin Panel</h2>
          <ul style={styles.menuList}>
            {menus.map((menu, index) => (
              <li
                key={index}
                style={{
                  ...styles.menuItem,
                  backgroundColor:
                    selectedMenu === menu.name ? '#2c3e50' : 'transparent',
                }}
                onClick={() => handleMenuClick(menu.name)}
              >
                {menu.name}
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.content}>
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p>Loading...</p>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: "'Poppins', sans-serif",

  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#ffffff',
    padding: '10px 20px',
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
    marginRight: '5px',
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
    padding: '15px 35px',
    fontWeight:'600',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  dashboardContainer: {
    display: 'flex',
    flex: 1,
    marginTop: '80px',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    padding: '20px',
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
    fontWeight:'500',
    transition: 'background-color 0.3s',
  },
  content: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ecf0f1',
  },
  loadingContainer: {
    textAlign: 'center',
    marginTop: '50px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #4285f4',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '20px auto',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default AdminDashboard;
