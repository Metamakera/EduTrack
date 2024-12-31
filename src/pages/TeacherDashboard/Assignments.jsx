import React, { useState } from 'react';
import axios from 'axios';

const AssignmentUpload = () => {
    const [teacherId, setTeacherId] = useState('');
    const [className, setClassName] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [assignmentQuestion, setAssignmentQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    
    // State for submission view
    const [assignments, setAssignments] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    
    // Handle form submit for assignment upload
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!teacherId || !className || !subjectName || !assignmentQuestion) {
            setResponseMessage("All fields are required!");
            return;
        }

        const formData = {
            teacherId,
            className,
            subjectName,
            assignmentQuestion
        };

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5002/upload-assignment', formData);
            setResponseMessage(response.data.message);
            setShowSuccessPopup(true); // Show success popup

            // Hide the popup after 2 seconds
            setTimeout(() => {
                setShowSuccessPopup(false);
            }, 2000);

        } catch (error) {
            setResponseMessage('Error uploading assignment: ' + error.response?.data?.message || 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch assignments based on className and subjectName
    const fetchAssignments = async (e) => {
        e.preventDefault();

        if (!className || !subjectName) {
            setResponseMessage("Class Name and Subject Name are required to fetch assignments.");
            return;
        }

        setIsFetching(true);
        try {
            const response = await axios.get('http://localhost:5002/fetch-assignment', {
                params: { className, subjectName }
            });
            setAssignments(response.data);
        } catch (error) {
            setResponseMessage('Error fetching assignments: ' + error.response?.data?.message || 'Unknown error');
        } finally {
            setIsFetching(false);
        }
    };

    const closePopup = () => {
        setShowSuccessPopup(false);
    };

    return (
        <div className="assignment-upload-container">
            <h2>Upload Assignment</h2>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-group">
                    <label htmlFor="teacherId">Teacher ID:</label>
                    <input
                        type="text"
                        id="teacherId"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        placeholder="Enter Teacher ID"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="className">Class Name:</label>
                    <input
                        type="text"
                        id="className"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="Enter Class Name"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="subjectName">Subject Name:</label>
                    <input
                        type="text"
                        id="subjectName"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        placeholder="Enter Subject Name"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="assignmentQuestion">Assignment Question:</label>
                    <textarea
                        id="assignmentQuestion"
                        value={assignmentQuestion}
                        onChange={(e) => setAssignmentQuestion(e.target.value)}
                        placeholder="Enter Assignment Question"
                        required
                    />
                </div>

                <button type="submit" disabled={isLoading} className="submit-button">
                    {isLoading ? 'Uploading...' : 'Upload Assignment'}
                </button>
            </form>

            {responseMessage && <p className="response-message">{responseMessage}</p>}

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close-btn" onClick={closePopup}>&times;</span>
                        <div className="success-message">
                            <span className="check-icon">✔️</span>
                            <span>Upload Successful</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Submission View Section */}
            <div className="submission-view">
                <h3>Submission View</h3>
                {/* Form to Fetch Assignments */}
                <form onSubmit={fetchAssignments} className="fetch-form">
                    <div className="form-group">
                        <label htmlFor="submissionClassName">Class Name:</label>
                        <input
                            type="text"
                            id="submissionClassName"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            placeholder="Enter Class Name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="submissionSubjectName">Subject Name:</label>
                        <input
                            type="text"
                            id="submissionSubjectName"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            placeholder="Enter Subject Name"
                            required
                        />
                    </div>

                    <button type="submit" disabled={isFetching} className="fetch-button">
                        {isFetching ? 'Fetching Assignments...' : 'Fetch Assignments'}
                    </button>
                </form>

                {assignments.length > 0 && (
                    <table className="assignments-table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Assignment Title</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment, index) => (
                                <tr key={index}>
                                    <td>{assignment.studentId}</td>
                                    <td>{assignment.assignmentTitle}</td>
                                    <td>
                                        <a href={`http://localhost:5002${assignment.file.path}`} download>
                                            Download
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {assignments.length === 0 && !isFetching && (
                    <p>No assignments found for the given class and subject.</p>
                )}
            </div>

            {/* Internal CSS Styles */}
            <style jsx>{`
                .assignment-upload-container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f4f4f4;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                h2 {
                    text-align: center;
                    font-size: 24px;
                    margin-bottom: 20px;
                }

                .upload-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-group label {
                    font-size: 15px;
                    margin-bottom: 5px;
                    color: #333;
                    font-weight: 600;
                }

                .form-group input, .form-group textarea {
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #fff;
                }

                .form-group input:focus, .form-group textarea:focus {
                    outline: none;
                    border-color: #4CAF50;
                }

                .submit-button {
                    padding: 10px 20px;
                    font-size: 16px;
                    font-weight: 700;
                    border: none;
                    border-radius: 5px;
                    background-color: #4CAF50;
                    color: white;
                    cursor: pointer;
                }

                .response-message {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 16px;
                    font-weight: bold;
                    color: rgb(2, 126, 19);
                }

                .popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }

                .popup-content {
                    background-color: white;
                    padding: 50px;
                    border-radius: 8px;
                    text-align: center;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    position: relative;
                }

                .close-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 20px;
                    cursor: pointer;
                }

                .success-message {
                    font-size: 18px;
                    color: #2ecc71;
                    font-weight: bold;
                }

                .check-icon {
                    margin-right: 10px;
                }

                .submission-view {
                    margin-top: 30px;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                .fetch-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .fetch-button {
                    width:200px;
                    font-size: 16px;
                    background-color:rgb(71, 132, 230);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .fetch-button:disabled {
                    background-color: #dcdcdc;
                    cursor: not-allowed;
                }

                .assignments-table {
                    width: 100%;
                    border-collapse: collapse;
                    padding:10px;
                }

                .assignments-table th, .assignments-table td {
                    padding: 12px;
                    text-align: left;
                    border: 1px solid #ddd;
                }

                .assignments-table th {
                    background-color:rgb(71, 132, 230);
                    color:white;
                }

                .assignments-table a {
                    padding:10px 15px;
                    color:white;
                    border-radius:4px;
                    background:rgb(17, 0, 168);
                    }
                    
                    .assignments-table a:hover {
                     background:blue;
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default AssignmentUpload;
