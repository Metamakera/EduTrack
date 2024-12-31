import React, { useEffect, useState } from 'react';

const AdminInfo = ({ adminName }) => {
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!adminName) {
      setError('Admin name is required');
      return;
    }

    // Fetch admin data from the backend API
    fetch(`http://localhost:5000/api/admin/${encodeURIComponent(adminName)}`)
      .then(response => {
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }
        return response.json();
      })
      .then(data => setAdminData(data))
      .catch(err => setError('Error fetching data: ' + err.message));
  }, [adminName]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Information</h1>
      <div>
        <strong>Name:</strong> {adminData.admin_name}
      </div>
      <div>
        <strong>Profession:</strong> {adminData.profession}
      </div>
      <div>
        <strong>Experience:</strong> {adminData.experience}
      </div>
      <div>
        <strong>Skills:</strong> {adminData.skills ? adminData.skills.join(', ') : 'N/A'}
      </div>
      <div>
        <strong>Bio:</strong> {adminData.bio}
      </div>
      <div>
        <strong>Contact:</strong> {adminData.contact}
      </div>
      <div>
        <strong>Image:</strong>
        <img src={adminData.imageUrl} alt="Admin" width="100" />
      </div>
    </div>
  );
};

export default AdminInfo;
