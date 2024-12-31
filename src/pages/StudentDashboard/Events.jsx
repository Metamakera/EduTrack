import React, { useState, useEffect } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]); // Store events
  const [studentId, setStudentId] = useState(''); // Store student ID input
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event
  const [message, setMessage] = useState(''); // Store response message
  const [loading, setLoading] = useState(true);

  // Fetch events from the backend
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle participation
  const handleParticipate = async () => {
    if (!studentId || !selectedEvent) {
      setMessage('Please provide both student ID and event name.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/events/participate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: studentId,
          event_name: selectedEvent.name, // Use selected event's name
        }),
      });
      const data = await response.json();
      setMessage(data.message || 'Error participating in event');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while participating.');
    }
  };

  // UseEffect to fetch events initially
  useEffect(() => {
    fetchEvents();
  }, []);

  // Set the event details when an event is selected
  const handleEventSelection = (eventId) => {
    const event = events.find((event) => event._id === eventId);
    setSelectedEvent(event); // Set the selected event's details
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Upcoming Events</h3>

      {/* Event selection dropdown */}
      <div style={styles.inputGroup}>
        <label htmlFor="event-select" style={styles.label}>Select Event:</label>
        <select
          id="event-select"
          onChange={(e) => handleEventSelection(e.target.value)}
          style={styles.select}
        >
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display event details */}
      {selectedEvent && (
        <div style={styles.eventDetails}>
          <h4 style={styles.eventDetailTitle}>{selectedEvent.name}</h4>
          <p><strong>Date:</strong> {selectedEvent.date}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
        </div>
      )}

      {/* Student ID input */}
      {selectedEvent && (
        <div style={styles.inputGroup}>
          <label htmlFor="student-id" style={styles.label}>Enter Student ID:</label>
          <input
            id="student-id"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Your student ID"
            style={styles.input}
          />
        </div>
      )}

      {/* Participate button */}
      {selectedEvent && (
        <button onClick={handleParticipate} style={styles.button}>
          Participate
        </button>
      )}

      {/* Message */}
      {message && <p style={styles.message}>{message}</p>}

      {/* Loading state */}
      {loading && <p style={styles.loading}>Loading events...</p>}
    </div>
  );
};

// Professional styling
const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '12px 25px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  message: {
    fontSize: '1rem',
    color: '#333',
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#888',
  },
  eventDetails: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  eventDetailTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
};

export default Events;
