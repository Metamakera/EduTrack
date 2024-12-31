
//import { useLocation } from 'react-router-dom'; // assuming you are using react-router
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Home from './pages/Home';
import About from './pages/About';   // Import About page
import Contact from './pages/Contact';  // Import Contact page
import Unauthorized from './pages/Unauthorized';
import logo from './assets/logo.png';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const updateTitleAndFavicon = () => {
      const path = location.pathname;

      switch (path) {
        case '/':
          document.title = 'Home - EduTrack';
          document.querySelector("link[rel='icon']").setAttribute('href', logo); // Use the imported logo path

          break;
        case '/login':
          document.title = 'Login - EduTrack';
          document.querySelector("link[rel='icon']").setAttribute('href', logo); // Use the imported logo path
          break;
        case '/teacher/dashboard':
          document.title = 'Teacher Dashboard - EduTrack';
          document.querySelector("link[rel='icon']").setAttribute('href', logo); // Use the imported logo path
          break;
        case '/student/dashboard':
          document.title = 'Student Dashboard - EduTrack';
          document.querySelector("link[rel='icon']").setAttribute('href', logo); // Use the imported logo path
          break;
        case '/admin/dashboard':
          document.title = 'Admin Dashboard - EduTrack';
          document.querySelector("link[rel='icon']").setAttribute('href', logo); // Use the imported logo path
          break;
        case '/about':
          document.title = 'About Us - EduTrack';
          document.querySelector("link[rel='icon']").setAttribute('href', logo); // Use the imported logo path
          break;
        case '/contact':
          document.title = 'Contact Us - EduTrack';
          document.querySelector("link[rel='icon']").setAttribute('href', logo); // Use the imported logo path
          break;
        default:
          document.title = 'Unauthorized - EduTrack';
          document.querySelector("link[rel='icon']").setAttribute('href', logo); // Use the imported logo path
          break;
      }
    };

    updateTitleAndFavicon();
  }, [location.pathname]);

  return (
    <>
      {/* Only render Navbar for specific routes */}
      {['/', '/login', '/about', '/contact'].includes(location.pathname) && <Navbar />}
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />  {/* Route for About page */}
          <Route path="/contact" element={<Contact />} />  {/* Route for Contact page */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* If the route does not match, redirect to Unauthorized */}
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </div>
      
      <Footer />
    </>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
