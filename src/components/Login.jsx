import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import studentIcon from '/src/assets/student-logo.png'; 
import teacherIcon from '/src/assets/teacher-logo.png';
import adminIcon from '/src/assets/admin-logo.png';

const Login = () => {
  const [role, setRole] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const navigate = useNavigate();

  // Generate a random CAPTCHA string of 5 characters
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaString = '';
    for (let i = 0; i < 5; i++) {
      captchaString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(captchaString);
  };

  // Trigger CAPTCHA generation when the form is shown
  useEffect(() => {
    if (showLoginForm) {
      generateCaptcha();
    }
  }, [showLoginForm]);

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Check if CAPTCHA is correct
    if (captcha !== captchaInput) {
      setError('Incorrect CAPTCHA.');
      return;
    }

    // Student login logic
    if (role === 'Student') {
      try {
        const response = await fetch('http://localhost:5000/api/student/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentID: credentials.username, // studentID is passed as the username
            password: credentials.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // On successful login, navigate to the student dashboard
          navigate('/student/dashboard');
        } else {
          setError(data.message || 'Invalid credentials');
        }
      } catch (err) {
        setError('Server error. Please try again later.');
      }
    }
    // Teacher login logic
    else if (role === 'Teacher') {
      try {
        const response = await fetch('http://localhost:5000/api/teacher/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            teacher_id: credentials.username,
            password: credentials.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Navigate to teacher dashboard
          navigate('/teacher/dashboard');
        } else {
          setError(data.message || 'Invalid credentials');
        }
      } catch (err) {
        setError('Server error. Please try again later.');
      }
    }
    // Admin login logic (mocked)
    else if (role === 'Admin') {
      const mockAdminData = { username: 'admin', password: 'admin123' };
      if (
        credentials.username === mockAdminData.username &&
        credentials.password === mockAdminData.password
      ) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid Admin credentials');
      }
    } else {
      setError('This role is not implemented yet.');
    }
  };

  return (
    <div className="login-container">
      <h1>Select Your Role</h1>

      <div className="role-selection">
        <div 
          className="role-box" 
          onClick={() => { setRole('Student'); setShowLoginForm(true); }}
        >
          <img src={studentIcon} alt="Student" className="role-icon" />
          <div className="role-name">Student</div>
        </div>
        <div 
          className="role-box" 
          onClick={() => { setRole('Teacher'); setShowLoginForm(true); }}
        >
          <img src={teacherIcon} alt="Teacher" className="role-icon" />
          <div className="role-name">Teacher</div>
        </div>
        <div 
          className="role-box" 
          onClick={() => { setRole('Admin'); setShowLoginForm(true); }}
        >
          <img src={adminIcon} alt="Admin" className="role-icon" />
          <div className="role-name">Admin</div>
        </div>
      </div>

      {showLoginForm && (
        <div className="login-form-popup">
          <div className="form-container">
            <h2>Login as {role}</h2>
            <form onSubmit={handleLoginFormSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter CAPTCHA"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
                <div className="captcha-text">{captcha}</div>
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit">Login</button>
            </form>
            <button className="close-btn" onClick={() => setShowLoginForm(false)}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f5f5f5;
          font-family: 'Poppins', sans-serif;
        }

        .login-container h1 {
          font-size: 2.5rem;
          margin-bottom: 40px;
          color: #333;
        }

        .role-selection {
          display: flex;
          justify-content: space-around;
          gap: 30px;
          width: 80%;
          max-width: 800px;
        }

        .role-box {
          height: 100px;
          width: 200px;
          border-radius: 10px;
          padding: 10px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .role-box:hover {
          transform: scale(1.05);
        }

        .role-box:hover .role-name {
          font-weight: 900;
        }

        .role-icon {
          width: 80px;
          height: 80px;
        }

        .role-name {
          margin-top: 10px;
          font-size: 1.2rem;
          color: #333;
          font-weight: 500;
        }

        .login-form-popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-container {
          background: #fff;
          padding: 50px 40px;
          border-radius: 12px;
          width: 360px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          font-family: 'Poppins', sans-serif;
        }

        .form-container h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 30px;
          color: #444;
        }

        .form-container input {
          width: 100%;
          padding: 14px;
          margin: 10px 0;
          border-radius: 4px;
          border: 1px solid #ddd;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-container input:focus {
          border-color: #4285f4;
          box-shadow: 0 0 5px rgba(66, 133, 244, 0.3);
        }

        .form-container button {
          padding: 12px;
          background-color: rgb(12, 72, 167);
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 20px;
          width: 100%;
          transition: background-color 0.3s ease;
        }

        .form-container button:hover {
          color: rgb(12, 72, 167);
          background: transparent;
          border: 1px solid rgb(12, 72, 167);
        }

        .form-container .close-btn {
          margin-top: 15px;
          background-color: transparent;
          border: 1px solid rgb(12, 72, 167);
          color: rgb(12, 72, 167);
          cursor: pointer;
          font-size: 0.9rem;
        }

        .form-container .close-btn:hover {
          color: white;
          background: rgb(136, 25, 8);
        }

        .form-container .error-message {
          color: red;
          font-size: 0.9rem;
          margin-top: 10px;
        }

        .captcha-text {
          margin-top: 10px;
          font-size: 18px;
          letter-spacing: 2px;
          color: #e7e4e4;
          font-family:cursive;
          border-radius:2px;
          width:100px;
          background:url('src/assets/captchabg.jpg');
          padding:5px;
        }
      `}</style>
    </div>
  );
};

export default Login;
