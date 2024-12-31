import React, { useState, useEffect } from 'react';

const ClassMessages = () => {
  const [teacherIDs, setTeacherIDs] = useState([]);
  const [selectedTeacherID, setSelectedTeacherID] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch teacher IDs from the backend
  useEffect(() => {
    const fetchTeacherIDs = async () => {
      try {
        const response = await fetch('http://localhost:5000/teachers');
        if (response.ok) {
          const data = await response.json();
          setTeacherIDs(data);
        } else {
          console.error('Failed to fetch teacher IDs');
        }
      } catch (error) {
        console.error('Error fetching teacher IDs:', error);
      }
    };

    fetchTeacherIDs();
  }, []);

  // Fetch messages when a teacher is selected
  const fetchMessages = async (teacherID) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/class-messages/${teacherID}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        setMessages([]);
        console.error('Failed to fetch messages for teacher ID:', teacherID);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    setLoading(false);
  };

  // Handle dropdown change (teacher selection)
  const handleTeacherChange = (event) => {
    const teacherID = event.target.value;
    setSelectedTeacherID(teacherID);
    if (teacherID) {
      fetchMessages(teacherID);
    } else {
      setMessages([]);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Class Messages</h2>

      {/* Dropdown to select teacher ID */}
      <div style={styles.dropdownWrapper}>
        <label htmlFor="teacherSelect" style={styles.label}>Select Teacher:</label>
        <select
          id="teacherSelect"
          style={styles.dropdown}
          value={selectedTeacherID}
          onChange={handleTeacherChange}
        >
          <option value="">Select a Teacher</option>
          {teacherIDs.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>

      {/* Show messages for the selected teacher */}
      <div style={styles.messagesContainer}>
        {loading ? (
          <p style={styles.loadingText}>Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} style={styles.messageCard}>
              <p style={styles.messageClass}><strong>Class:</strong> {message.class}</p>
              <p style={styles.messageText}><strong>Message:</strong> {message.message}</p>
            </div>
          ))
        ) : (
          <p style={styles.noMessagesText}>No messages to display</p>
        )}
      </div>
    </div>
  );
};

// Styling with enhanced design
const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Helvetica, Arial, sans-serif',
    textAlign: 'center',
  },
  heading: {
    color: '#2C3E50',
    fontSize: '36px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  dropdownWrapper: {
    marginBottom: '20px',
    textAlign: 'left',
    fontSize: '16px',
    color: '#34495E',
  },
  label: {
    fontSize: '18px',
    marginBottom: '10px',
    display: 'block',
  },
  
  dropdown: {
    padding: '12px',
    width: '100%',
    maxWidth: '400px',
    border: '2px solid #BDC3C7',
    borderRadius: '8px',
    backgroundColor: '#fff',
    fontSize: '16px',
    color: '#34495E',
    fontFamily: 'Arial, sans-serif',
    transition: 'all 0.3s ease',
  },
  messagesContainer: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '2px solid #BDC3C7',
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    marginBottom: '15px',
    textAlign: 'left',
    fontSize: '16px',
    color: '#34495E',
    transition: 'box-shadow 0.3s ease',
  },
  messageClass: {
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  messageText: {
    marginTop: '10px',
    color: '#7F8C8D',
  },
  noMessagesText: {
    fontStyle: 'italic',
    color: '#95A5A6',
  },
  loadingText: {
    fontSize: '18px',
    color: '#2C3E50',
  },
};

export default ClassMessages;
