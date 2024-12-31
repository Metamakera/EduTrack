import React, { useState, useEffect } from 'react';

const ClassMessage = () => {
  const [messages, setMessages] = useState([]);
  const [teacherID, setTeacherID] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/post-messages');
      const data = await response.json();
      setMessages(data.messages);
    } catch (err) {
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMessage = async (e) => {
    e.preventDefault();

    if (!teacherID || !selectedClass || !newMessage.trim()) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await fetch('http://localhost:5000/api/post-messages/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherID,
          class: selectedClass,
          message: newMessage,
        }),
      });
      setTeacherID('');
      setSelectedClass('');
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      setError('Failed to add message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Class Messages</h3>
      <div style={styles.formContainer}>
        <h4 style={styles.subtitle}>Add a New Message</h4>
        <form onSubmit={handleAddMessage} style={styles.form}>
          <input
            type="text"
            value={teacherID}
            onChange={(e) => setTeacherID(e.target.value)}
            placeholder="Enter Teacher ID"
            required
            style={styles.input}
          />
          <input
            type="text"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            placeholder="Enter Class"
            required
            style={styles.input}
          />
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here"
            required
            style={styles.textarea}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Posting...' : 'Add Message'}
          </button>
        </form>
      </div>

      {error && <div style={styles.errorMessage}>{error}</div>}

      <h4 style={styles.subtitle}>Messages</h4>
      {loading ? (
        <p style={styles.loading}>Loading messages...</p>
      ) : (
        <ul style={styles.messageList}>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <li key={msg._id} style={styles.messageItem}>
                <strong>{msg.teacherID} ({msg.class}):</strong> {msg.message}
                <br />
                <small>{new Date(msg.created_at).toLocaleString()}</small>
              </li>
            ))
          ) : (
            <p style={styles.noMessages}>No messages available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  formContainer: {
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  textarea: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    resize: 'none',
    height: '80px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
  loading: {
    textAlign: 'center',
    color: '#555',
  },
  messageList: {
    listStyle: 'none',
    padding: '0',
  },
  messageItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  },
  noMessages: {
    textAlign: 'center',
    color: '#777',
  },
};

export default ClassMessage;
