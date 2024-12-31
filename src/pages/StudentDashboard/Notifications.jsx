import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/get-messages');
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Notifications by ADMIN</h1>
      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : messages.length === 0 ? (
        <div style={styles.noMessages}>No messages available</div>
      ) : (
        <div style={styles.messagesList}>
          {messages.map((message) => (
            <div key={message._id.$oid} style={styles.messageCard}>
              <h3 style={styles.messageTitle}>{message.title}</h3>
              <p style={styles.messageContent}>{message.content}</p>
              <p style={styles.messageDate}>
                {new Date(message.date.$date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
    fontWeight: '600',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  },
  noMessages: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#888',
  },
  messagesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  messageCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  messageCardHover: {
    backgroundColor: '#f4f4f4',
    transform: 'scale(1.05)',
  },
  messageTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: '10px',
  },
  messageContent: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
    lineHeight: '1.6',
  },
  messageDate: {
    fontSize: '0.9rem',
    color: '#777',
    textAlign: 'right',
    fontStyle: 'italic',
  },
};

export default Notifications;
