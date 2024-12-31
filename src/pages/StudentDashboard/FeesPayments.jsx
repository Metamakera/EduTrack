import React, { useState, useEffect } from 'react';

const FeesPayment = () => {
  const [selectedTerm, setSelectedTerm] = useState('1');
  const [feesStatus, setFeesStatus] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFees = async (term) => {
      try {
        console.log(`Fetching fees for term: ${term}`);
        const response = await fetch(`http://localhost:5000/fees/${term}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched fees data:', data);
          setFeesStatus({ totalAmount: data.totalAmount, paidAmount: data.paidAmount });
        } else if (response.status === 404) {
          setFeesStatus(null); // No data available
        } else {
          throw new Error('Failed to fetch fees');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFees(selectedTerm);
  }, [selectedTerm]);

  const handleTermChange = (event) => {
    const term = event.target.value;
    setSelectedTerm(term);
    setLoading(true);
    setError(null);
    setFeesStatus(null); // Reset the feesStatus
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      <h3>Fees Payment</h3>
      <p>Here you can view your fee payment status for the selected term.</p>

      {/* Term Selection Dropdown */}
      <div style={styles.selectContainer}>
        <label htmlFor="term-select" style={styles.label}>
          Select Term:
        </label>
        <select
          id="term-select"
          value={selectedTerm}
          onChange={handleTermChange}
          style={styles.select}
        >
          <option value="1">Term 1</option>
          <option value="2">Term 2</option>
          <option value="3">Term 3</option>
        </select>
      </div>

      {/* Display fee status or no data available message */}
      <div style={styles.feeStatus}>
        {feesStatus ? (
          <>
            <p><strong>Total Fee:</strong> ₹{feesStatus.totalAmount}</p>
            <p><strong>Paid Amount:</strong> ₹{feesStatus.paidAmount}</p>
            <p><strong>Remaining Fee:</strong> ₹{feesStatus.totalAmount - feesStatus.paidAmount}</p>
          </>
        ) : (
          <p>No data available for the selected term.</p>
        )}
      </div>
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
  },
  selectContainer: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1rem',
    marginRight: '10px',
  },
  select: {
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  feeStatus: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
};

export default FeesPayment;
