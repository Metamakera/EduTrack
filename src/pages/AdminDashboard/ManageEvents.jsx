import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      console.log('Fetched Events:', response.data); // Check the fetched data
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err); // Log the error to the console
      setError('Error fetching events.');
    }
  };

  // Add a new event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!name || !date || !location) {
      setError('All fields are required');
      return;
    }
    try {
      const newEvent = { name, date, location };
      await axios.post('http://localhost:5000/api/events', newEvent);
      setSuccessMessage('Event created successfully!');
      fetchEvents(); // Fetch the updated events list
      setName('');
      setDate('');
      setLocation('');
      setError('');
    } catch (err) {
      console.error('Error adding event:', err); // Log the error to the console
      setError('Error adding event');
    }
  };

  // Delete an event by ID
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      fetchEvents(); // Fetch the updated events list
    } catch (err) {
      console.error('Error deleting event:', err); // Log the error to the console
      setError('Error deleting event');
    }
  };

  // Use effect to fetch events when the component loads
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Manage Events</h3>

      {/* Add Event Form */}
      <form onSubmit={handleAddEvent}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event Name"
          style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Event Location"
          style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Add Event
        </button>
      </form>

      {/* Display Success or Error Message */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Button to manually fetch and display the events */}
      <button
        onClick={fetchEvents}
        style={{
          padding: '10px 20px',
          backgroundColor: '#008CBA',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      >
        List Events
      </button>

      {/* Event List */}
      <h4>Event List</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map(({ _id, name, date, location }) => (
          <li
            key={_id}
            style={{
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          >
            <h5>{name}</h5>
            <p>
              <strong>Date:</strong> {new Date(date).toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong> {location}
            </p>
            <button
              onClick={() => handleDeleteEvent(_id)}
              style={{
                padding: '5px 10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEvents;
