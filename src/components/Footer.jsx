import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We are dedicated to providing an efficient and seamless school management experience.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@edutrack.com</p>
          <p>Phone: +123-456-7890</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Student Portal</a></li>
            <li><a href="#">Teacher Portal</a></li>
            <li><a href="#">Admin Portal</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 EduTrack. All Rights Reserved.</p>
      </div>

      <style jsx>{`
        .footer {
          background-color: #282c34;
          color: white;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
          position: relative;
          bottom: 0;
          width: 100%;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .footer-section {
          flex: 1;
          padding: 0 20px;
        }

        .footer-section h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .footer-section p {
          font-size: 1rem;
          margin-bottom: 5px;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section ul li {
          margin-bottom: 10px;
        }

        .footer-section ul li a {
          text-decoration: none;
          color: #4285f4;
        }

        .footer-section ul li a:hover {
          text-decoration: underline;
        }

        .social-links a {
          color: #4285f4;
          margin-right: 15px;
          text-decoration: none;
        }

        .social-links a:hover {
          text-decoration: underline;
        }

        .footer-bottom {
          text-align: center;
          font-size: 1rem;
        }

        .footer-bottom p {
          margin-top: 10px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
