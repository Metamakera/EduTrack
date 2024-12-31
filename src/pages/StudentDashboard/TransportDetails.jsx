import React from 'react';

const TransportDetails = () => {
  return (
    <div style={styles.container}>
      <h3>Transport Details</h3>
      <p>Sorry, you are not owing the transportation facility of the school.</p>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: '20px auto',
    textAlign: 'center', // Center the message
  },
};

export default TransportDetails;
