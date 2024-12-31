import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about">
      <h1 className="about-heading">About Us</h1>
      <p className="about-description">
        Welcome to our school! We strive to provide the best educational experience for our students. Our mission is to foster growth, creativity, and success in every student.
      </p>

      {/* Styled Cards Section */}
      <div className="card-container">
        <div className="card">
          <h3>Our Vision</h3>
          <p>We aim to be a leading institution in shaping the future of education, preparing students for success in a global community.</p>
        </div>

        <div className="card">
          <h3>Our Mission</h3>
          <p>Our mission is to provide quality education, nurture creativity, and support the holistic development of every student.</p>
        </div>

        <div className="card">
          <h3>Our Values</h3>
          <p>Integrity, compassion, and excellence are at the core of everything we do. We believe in nurturing the whole student.</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-container">
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h4>John Doe</h4>
            <p>Principal</p>
          </div>

          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h4>Jane Smith</h4>
            <p>Head of Education</p>
          </div>

          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h4>Sam Wilson</h4>
            <p>Head of Administration</p>
          </div>
        </div>
      </div>

      {/* Animated Scroll Section */}
      <div className="animation-section">
        <h2 className="animation-heading">Our Achievements</h2>
        <div className="achievement-container">
          <div className="achievement-card">
            <h3>Best School of the Year</h3>
            <p>Recognized for excellence in education and community service.</p>
          </div>

          <div className="achievement-card">
            <h3>Top Educators Award</h3>
            <p>Honored for exceptional teaching and student engagement.</p>
          </div>

          <div className="achievement-card">
            <h3>Innovative Curriculum</h3>
            <p>Awarded for introducing creative teaching methods.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
