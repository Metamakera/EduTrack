import React from 'react';
import '/src/styles/Home.css';
import pic1 from '/src/assets/gallery1.jpeg';
import pic2 from '/src/assets/gallery2.jpeg';
import pic3 from '/src/assets/gallery3.jpeg';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero-title">Welcome to EduTrack</h1>
        <p className="hero-subtitle">Your Future Starts Here</p>
        <button className="cta-button">Explore Now</button>
      </header>

      {/* Introduction Section */}
      <section className="intro">
        <p>At ABC School, we nurture young minds and inspire a passion for learning. With modern facilities, a dedicated faculty, and a vibrant extracurricular program, we create opportunities for every student to succeed.</p>
      </section>

      {/* Mission Section */}
      <section className="mission fade-in">
        <h2>Our Mission</h2>
        <p>Our mission is to provide a comprehensive education that fosters intellectual, social, and emotional growth in a supportive environment.</p>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose fade-in">
        <h2>Why Choose ABC School?</h2>
        <ul>
          <li><strong>Experienced Faculty:</strong> Qualified and passionate educators.</li>
          <li><strong>Modern Facilities:</strong> Advanced classrooms, labs, and sports amenities.</li>
          <li><strong>Extracurricular Activities:</strong> Diverse clubs and activities for holistic growth.</li>
          <li><strong>Safe Environment:</strong> Prioritizing safety and well-being for all students.</li>
        </ul>
      </section>

      {/* Parent Involvement Section */}
      <section className="get-involved fade-in">
        <h2>Get Involved</h2>
        <p>We value parent involvement. Join the PTA, volunteer at events, and stay engaged with your child’s education journey.</p>
      </section>

      {/* Gallery Section */}
      <section className="gallery fade-in">
        <h2>The way to grow..</h2>
        <div className="gallery-cards">
          <div className="gallery-card">
            <img src={pic1} alt="School Event" />
            <div className="gallery-overlay">
              <h3>School Event</h3>
            </div>
          </div>
          <div className="gallery-card">
            <img src={pic2} alt="Classroom" />
            <div className="gallery-overlay">
              <h3>Classroom</h3>
            </div>
          </div>
          <div className="gallery-card">
            <img src={pic3} alt="Sports Day" />
            <div className="gallery-overlay">
              <h3>Sports Day</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact fade-in">
        <h2>Contact Us</h2>
        <p>Questions? Reach out at <a href="tel:1234567890">(123) 456-7890</a> or email <a href="mailto:info@abcschool.com">info@abcschool.com</a>.</p>
      </section>

      {/* Footer Section */}
      {/* <footer className="footer">
        <p>&copy; 2024 ABC School. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Home;
