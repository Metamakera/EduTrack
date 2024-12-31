import React from 'react';

const Timetable = () => {
  return (
    <section id="time-table" style={styles.section}>
      <h3>Time Table</h3>
      <p>View and manage the class timetable here.</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Day</th>
            <th style={styles.tableHeader}>Period 1</th>
            <th style={styles.tableHeader}>Period 2</th>
            <th style={styles.tableHeader}>Period 3</th>
            <th style={styles.tableHeader}>Period 4</th>
            <th style={styles.tableHeader}>Period 5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.tableCell}>Monday</td>
            <td style={styles.tableCell}>Math</td>
            <td style={styles.tableCell}>Physics</td>
            <td style={styles.tableCell}>Chemistry</td>
            <td style={styles.tableCell}>Biology</td>
            <td style={styles.tableCell}>English</td>
          </tr>
          <tr>
            <td style={styles.tableCell}>Tuesday</td>
            <td style={styles.tableCell}>History</td>
            <td style={styles.tableCell}>Math</td>
            <td style={styles.tableCell}>Computer Science</td>
            <td style={styles.tableCell}>Physics</td>
            <td style={styles.tableCell}>Physical Education</td>
          </tr>
          <tr>
            <td style={styles.tableCell}>Wednesday</td>
            <td style={styles.tableCell}>Chemistry</td>
            <td style={styles.tableCell}>Biology</td>
            <td style={styles.tableCell}>Math</td>
            <td style={styles.tableCell}>English</td>
            <td style={styles.tableCell}>Geography</td>
          </tr>
          <tr>
            <td style={styles.tableCell}>Thursday</td>
            <td style={styles.tableCell}>Computer Science</td>
            <td style={styles.tableCell}>Math</td>
            <td style={styles.tableCell}>Physics</td>
            <td style={styles.tableCell}>Chemistry</td>
            <td style={styles.tableCell}>Physical Education</td>
          </tr>
          <tr>
            <td style={styles.tableCell}>Friday</td>
            <td style={styles.tableCell}>History</td>
            <td style={styles.tableCell}>Geography</td>
            <td style={styles.tableCell}>Math</td>
            <td style={styles.tableCell}>English</td>
            <td style={styles.tableCell}>Biology</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

const styles = {
  section: {
    opacity: 0,
    animation: 'fadeIn 1s forwards',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#18bc9c',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
  },
  tableCell: {
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
};

export default Timetable;
