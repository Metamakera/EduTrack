const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Grid = require('gridfs-stream');
const multer = require('multer');
const mongoose = require('mongoose');
const Student = require('./models/Student');
const S_TimeTable = require('./models/S_TimeTable');  // Adjust the path if needed
require('dotenv').config();
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
const jwt = require('jsonwebtoken');
// MongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
// Middleware
app.use(cors());
app.use(bodyParser.json());

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('StudentDB');
    const studentCollection = db.collection('Student_info');
    const teacherCollection = db.collection('Teacher_info');
    // const ClassCollection = db.collection('Class')
    const notificationsCollection = db.collection('Notifications');
    const feesPaymentsCollection = db.collection('Fees_payments');
    const postMessagesCollection = db.collection('Post_messages');
    const timetableCollection = db.collection('S_TimeTable');
    const SAttendanceCollection = db.collection('S_Attendance');
    const messagesCollection = db.collection('Messages');
    const eventCollection = db.collection('Events');
    
    // const db = require('./db');  // Make sure './db' matches the actual file name and location

  






    let generatedCaptcha = ''; // Store CAPTCHA

    // Generate CAPTCHA API (just for reference, you can use it or modify as per your requirement)
    app.get('/api/generate-captcha', (req, res) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let captcha = '';
      for (let i = 0; i < 5; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      generatedCaptcha = captcha;  // Store the generated CAPTCHA
      res.json({ captcha: generatedCaptcha });
    });
    
    // Login API
    app.post('/api/login', (req, res) => {
      const { username, password, captcha } = req.body;
    
      // Verify CAPTCHA
      if (captcha !== generatedCaptcha) {
        return res.status(400).json({ message: 'Incorrect CAPTCHA' });
      }
    
      // Validate username and password (example logic)
      if (username === 'validUser' && password === 'validPassword') {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    });
    












    app.post('/add-marks', async (req, res) => {
      const { teacherId, studentId, subjectName, marks, grade, term } = req.body;
    
      // Check if required fields are provided
      if (!teacherId || !studentId || !subjectName || marks == null || !grade || !term) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
    
      try {
        const marksCollection = db.collection('marks'); // Specify the marks collection
        const result = await marksCollection.insertOne({
          teacherId,
          studentId,
          subjectName,
          marks,
          grade,
          term, // Added term field
        });
    
        // Use result.insertedId instead of result.ops[0]
        res.status(200).json({
          message: 'Marks added successfully',
          data: {
            _id: result.insertedId, // Directly access the insertedId
            teacherId,
            studentId,
            subjectName,
            marks,
            grade,
            term, // Return the term in the response
          },
        });
      } catch (err) {
        console.error('Error inserting marks:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    

  // API to fetch marks, grade, and term by studentId and subjectName
  app.get('/get-marks', async (req, res) => {
    const { studentId, subjectName } = req.query;
  
    if (!studentId || !subjectName) {
      return res.status(400).json({ error: 'Student ID and Subject Name are required' });
    }
  
    try {
      const marksCollection = db.collection('marks'); // Access the marks collection
      const results = await marksCollection.find({ 
        studentId: studentId, 
        subjectName: subjectName 
      }).toArray(); // Use find() to get multiple results
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No marks found for the given student and subject' });
      }
  
      // Return the results
      res.status(200).json({
        message: 'Marks fetched successfully',
        data: results, // This will return all matching documents
      });
    } catch (err) {
      console.error('Error fetching marks:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

   // Fetch students based on teacherId and className from the Student_info collection
app.get('/get-students', async (req, res) => {
  const { teacherId, className } = req.query;

  try {
    // Fetch students from the 'Student_info' collection
    const students = await db.collection('Student_info').find({ teacherId, className }).toArray();

    if (students.length > 0) {
      res.status(200).json({ students });
    } else {
      res.status(404).json({ message: 'No students found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API: Fetch Students by Class Name
app.get('/api/get-students', async (req, res) => {
  const { className } = req.query;

  if (!className) {
      return res.status(400).json({ error: 'Class Name is required' });
  }

  try {
      const classData = await db.collection('Attendance').findOne({ className });

      if (!classData || !classData.students) {
          return res.status(404).json({ error: 'No students found for the specified class' });
      }

      const students = classData.students.map(student => ({
          studentId: student.studentId,
          studentName: student.studentName
      }));

      res.status(200).json({ students });
  } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Mark Attendance
// API: Mark Attendance
// API: Mark Attendance
// API: Mark Attendance
app.post('/api/mark-attendance', async (req, res) => {
  const { teacherId, className, students, date } = req.body;

  // Validate input
  if (!teacherId || !className || !students || students.length === 0 || !date) {
    return res.status(400).json({ error: 'Teacher ID, Class Name, Attendance data, and Date are required' });
  }

  try {
    // Step 1: Find the attendance record for the specified class, teacher, and date
    let classAttendance = await db.collection('Attendance').findOne({
      teacherId: teacherId,
      className: className,
      date: date, // Adding date filter to find attendance records for the specified date
    });

    // If no attendance record is found, create a new one
    if (!classAttendance) {
      classAttendance = {
        teacherId: teacherId,
        className: className,
        date: date,
        students: students.map(student => ({
          studentId: student.studentId,
          studentName: student.studentName,
          attendance: student.attendance
        }))
      };
      
      // Insert the new attendance record into the database
      const insertResult = await db.collection('Attendance').insertOne(classAttendance);
      if (insertResult.insertedCount === 0) {
        return res.status(500).json({ error: 'Failed to create new attendance record' });
      }

      return res.status(200).json({
        message: 'New attendance record created and attendance marked successfully',
        updatedStudents: classAttendance.students
      });
    }

    // Step 2: Update students' attendance in the found record
    const updatedStudents = classAttendance.students.map(student => {
      const updatedStudent = students.find(s => s.studentId === student.studentId);
      if (updatedStudent) {
        student.attendance = updatedStudent.attendance; // Update the attendance
      }
      return student;
    });

    // Step 3: Update the database with the modified attendance record
    const updateResult = await db.collection('Attendance').updateOne(
      { teacherId: teacherId, className: className, date: date },
      { $set: { students: updatedStudents } }
    );

    // Check if the update was successful
    if (updateResult.modifiedCount === 0) {
      return res.status(400).json({ error: 'Failed to update attendance. No changes were made.' });
    }

    // Successfully updated attendance
    res.status(200).json({ message: 'Attendance marked successfully', updatedStudents });

  } catch (err) {
    console.error('Error marking attendance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// API to fetch attendance by studentId and date
// API to fetch attendance by studentId and date (only attendance and date)
app.get('/api/get-student-attendance', async (req, res) => {
  const { studentId, date } = req.query;

  // Validate input
  if (!studentId || !date) {
    return res.status(400).json({ error: 'Student ID and date are required' });
  }

  try {
    // Fetch the attendance record for the given date
    const attendanceRecord = await db.collection('Attendance').findOne({
      date: date,
      'students.studentId': studentId,
    });

    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found for the given student and date' });
    }

    // Find the student's attendance status
    const studentAttendance = attendanceRecord.students.find(
      (student) => student.studentId === studentId
    );

    if (!studentAttendance) {
      return res.status(404).json({ error: 'Student not found in the attendance record' });
    }

    // Return only attendance status and date
    return res.json({
      attendance: studentAttendance.attendance,
      date: attendanceRecord.date,
    });
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// API to fetch all messages
app.get('/api/get-messages', async (req, res) => {
  try {
    // Fetch all messages from the Messages collection
    const messages = await db.collection('Messages').find().toArray();

    if (messages.length === 0) {
      return res.status(404).json({ error: 'No messages found' });
    }

    // Return the fetched messages
    return res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




   // Fetch distinct teacher IDs
app.get('/teachers', async (req, res) => {
  try {
    const PostMessageCollection = db.collection('Post_messages');
    const teacherIDs = await PostMessageCollection.distinct('teacherID');

    if (teacherIDs.length === 0) {
      return res.status(404).json({ error: 'No teachers found' });
    }

    res.status(200).json(teacherIDs);
  } catch (error) {
    console.error('Error fetching teacher IDs:', error);
    res.status(500).json({ error: 'Failed to fetch teacher IDs' });
  }
});

// Fetch class and message by teacherID
app.get('/class-messages/:teacherID', async (req, res) => {
  const { teacherID } = req.params;

  try {
    const PostMessageCollection = db.collection('Post_messages');

    // Fetch messages for the selected teacherID
    const classMessages = await PostMessageCollection
      .find({ teacherID })
      .toArray();

    if (classMessages.length === 0) {
      return res.status(404).json({ error: 'No class messages found for the given teacher ID' });
    }

    res.status(200).json(classMessages);  // Return the class and message data
  } catch (error) {
    console.error('Error fetching class messages:', error);
    res.status(500).json({ error: 'Failed to fetch class messages' });
  }
});

    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];  // Get the Authorization header
      const token = authHeader && authHeader.split(' ')[1];  // Extract the token from the header
      
      if (!token) {
        return res.status(401).json({ error: 'Token missing' });  // If no token, return 401 Unauthorized
      }
      const jwtSecret = process.env.JWT_SECRET;
      // Verify the token
      jwt.verify(token, jwtSecret, (err, user) => {  // Secret key is used to verify the token
        if (err) {
          return res.status(403).json({ error: 'Invalid token' });  // If token is invalid, return 403 Forbidden
        }
        
        req.user = user;  // Attach the decoded user data to the request object
        next();  // Continue to the next middleware or route handler
      });
    };


    (async () => {
      const {
        postMessagesCollection,
        messagesCollection,
        eventCollection,
      } = await connectToDB();
    
      // Get all messages
      app.get('/api/messages', async (req, res) => {
        try {
          const messages = await messagesCollection.find().toArray();
          res.json({ messages });
        } catch (err) {
          res.status(500).json({ error: 'Failed to fetch messages' });
        }
      });
    
      // Add a new post message (protected by JWT)
      app.post('/api/messages/add', authenticateToken, async (req, res) => {
        const { message } = req.body;
        if (!message) {
          return res.status(400).json({ error: 'Message cannot be empty' });
        }
    
        const newMessage = {
          teacher_id: req.user.id, // Extracted from token
          message,
          created_at: new Date(),
        };
    
        try {
          await postMessagesCollection.insertOne(newMessage);
          res.status(201).json({ message: 'Message added successfully' });
        } catch (err) {
          res.status(500).json({ error: 'Failed to add message' });
        }
      });
    })    

    // Fetch all messages
    app.get('/api/post-messages', async (req, res) => {
      try {
        const messages = await postMessagesCollection.find().toArray();
        res.json({ messages });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages.' });
      }
    });

    // Add a new message
    app.post('/api/post-messages/add', async (req, res) => {
      const { teacherID, class: selectedClass, message } = req.body;

      if (!teacherID || !selectedClass || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      try {
        const newMessage = {
          teacherID,
          class: selectedClass,
          message,
          created_at: new Date(),
        };
        await postMessagesCollection.insertOne(newMessage);
        res.status(201).json({ message: 'Message added successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to add message.' });
      }
    });


  // API to fetch student timetable by student_id
app.get('/timetable/:student_id', async (req, res) => {
  const student_id = req.params.student_id;
   
  try {
    // Access the 's_timetables' collection
    const timetable = await db.collection('S_TimeTable').findOne({ student_id: student_id });

    if (!timetable) {
      return res.status(404).json({ message: `Timetable for student ${student_id} not found` });
    }

    // Return the timetable data
    res.json(timetable);
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});


   // Define Mongoose Schemas
const classSchema = new mongoose.Schema({
  className: String,
  students: [
    {
      regNum: String,
      name: String,
    },
  ],
});

const attendanceSchema = new mongoose.Schema({
  teacherID: String,
  className: String,
  date: { type: Date, default: Date.now },
  attendance: [String], // List of student registration numbers
});

// Models
const Class = mongoose.model('Class', classSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Routes

// Get all classes
app.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find({}, 'className');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

// Get students by class name
app.get('/students/:className', async (req, res) => {
  const { className } = req.params;
  try {
    const classData = await Class.findOne({ className });
    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(classData.students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Submit attendance
app.post('/attendance', async (req, res) => {
  const { teacherID, className, attendance } = req.body;

  if (!teacherID || !className || !attendance || !attendance.length) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const newAttendance = new Attendance({
      teacherID,
      className,
      attendance,
    });

    await newAttendance.save();
    res.status(200).json({ message: 'Attendance submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit attendance' });
  }
});




    // Teacher Login API
// Teacher Login API
require('dotenv').config(); // Ensure this line is at the top

 // Import the JWT library
const bcrypt = require('bcryptjs');
//const teacherCollection = require('./teacherCollection'); // Your teacher collection

app.post('/api/teacher/login', async (req, res) => {
  const { teacher_id, password } = req.body;

  if (!teacher_id || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Teacher ID and password are required',
    });
  }

  try {
    const teacher = await teacherCollection.findOne({ teacher_id });

    if (!teacher) {
      return res.status(404).json({
        status: 'error',
        message: 'Teacher not found',
      });
    }

    // Compare the plain text password with the hashed password
    const isMatch = await bcrypt.compare(password, teacher.password);

    if (isMatch) {
      // Generate a JWT token for the session (optional, for session management)
      const token = jwt.sign(
        { teacher_id: teacher.teacher_id, name: teacher.name },
        process.env.JWT_SECRET_KEY, // Correctly get the secret key from environment variables
        { expiresIn: '1h' } // Token expiry duration (e.g., 1 hour)
      );

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        name: teacher.name,
        teacher_id: teacher.teacher_id,
        token: token,  // Send token back to the client (for storing in localStorage or cookies)
      });
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Invalid password',
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error logging in',
      error: error.message,
    });
  }
});

// const bcrypt = require('bcryptjs');

// Student Login API
app.post('/api/student/login', async (req, res) => {
  const { studentID, password } = req.body;

  // Validate that both fields are provided
  if (!studentID || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Student ID and password are required',
    });
  }

  try {
    // Find the student by studentID
    const student = await studentCollection.findOne({ studentID });

    // If student is not found, send error response
    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }

    // Compare the plain text password with the stored hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, student.password);

    if (isMatch) {
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        name: student.name, // Assuming the student document has a 'name' field
        studentID: student.studentID,
      });
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Invalid password',
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error logging in',
      error: error.message,
    });
  }
});


//const bcrypt = require('bcrypt'); // Import bcrypt

app.post('/api/login', async (req, res) => {
  const { teacher_id, password } = req.body;

  if (!teacher_id || !password) {
    return res.status(400).json({ error: 'Teacher ID and password are required' });
  }

  try {
    // Query the database for the teacher using teacher_id
    const teacher = await teacherCollection.findOne({ teacher_id });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Compare the incoming password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, teacher.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token if the password matches
    const user = { teacher_id: teacher.teacher_id, role: teacher.role }; // Assuming the teacher document has a 'role' field
    const accessToken = jwt.sign(user, 'secretkey', { expiresIn: '1h' });

    // Return the access token
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: 'Error during login' });
  }
});





    // Fetch all messages
    app.get('/api/messages', async (req, res) => {
      try {
        const messages = await messagesCollection.find().toArray();
        res.json(messages);
      } catch (err) {
        res.status(500).json({ message: 'Error fetching messages', error: err.message });
      }
    });

    // Add a new message
    app.post('/api/messages', async (req, res) => {
      const { title, content, date } = req.body;

      // Validate input fields
      if (!title || !content || !date) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      try {
        const newMessage = { title, content, date: new Date(date) };

        // Insert the message into the collection
        const result = await messagesCollection.insertOne(newMessage);

        res.status(201).json({
          message: 'Message added successfully',
          messageDetails: { ...newMessage, _id: result.insertedId }
        });
      } catch (err) {
        res.status(500).json({ message: 'Error adding message', error: err.message });
      }
    });

    // Teacher CRUD Endpoints
    app.get('/api/teachers', async (req, res) => {
      try {
        const teachers = await teacherCollection.find().toArray();
        res.status(200).json(teachers);
      } catch (err) {
        console.error('Error fetching teachers:', err);
        res.status(500).json({ message: 'Error fetching teachers', error: err.message });
      }
    });

    app.get('/api/teachers/:id', async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid teacher ID' });
      }

      try {
        const teacher = await teacherCollection.findOne({ _id: new ObjectId(id) });
        teacher
          ? res.json(teacher)
          : res.status(404).json({ message: 'Teacher not found' });
      } catch (err) {
        res.status(500).json({ message: 'Error fetching teacher', error: err.message });
      }
    });

    // Add a new teacher
    app.post('/api/teacher', async (req, res) => {
      const { teacher_id, name, password, subject, contact_info, address } = req.body;

      // Validate input fields
      if (!teacher_id || !name || !password || !subject || !contact_info || !address) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      try {
        // Check if the teacher already exists
        const existingTeacher = await teacherCollection.findOne({ teacher_id });
        if (existingTeacher) {
          return res.status(409).json({ message: 'Teacher ID already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = {
          teacher_id,
          name,
          password: hashedPassword,
          subject,
          contact_info,
          address,
        };

        const result = await teacherCollection.insertOne(newTeacher);

        res.status(201).json({
          message: 'Teacher added successfully',
          teacherDetails: { teacher_id, name, subject, contact_info, address, _id: result.insertedId },
        });
      } catch (error) {
        console.error('Error adding teacher:', error.message);
        res.status(500).json({ message: 'Error adding teacher', error: error.message });
      }
    });

    // Update a teacher by ID
    app.put('/api/teachers/:teacher_id', async (req, res) => {
      const { teacher_id } = req.params;
      const { name, subject, contact } = req.body;

      if (!ObjectId.isValid(teacher_id)) {
        return res.status(400).json({ message: 'Invalid teacher ID' });
      }

      try {
        const updatedTeacher = { $set: { name, subject, contact } };
        const result = await teacherCollection.updateOne(
          { _id: new ObjectId(teacher_id) },
          updatedTeacher
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Teacher not found' });
        }

        res.json({ message: 'Teacher updated successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error updating teacher', error: err.message });
      }
    });

    // Delete a teacher by ID
    app.delete('/api/teacher/:teacher_id', async (req, res) => {
      const teacher_id = req.params.teacher_id;

      try {
        const result = await teacherCollection.deleteOne({ teacher_id: teacher_id });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json({ message: 'Teacher deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting teacher', error: error.message });
      }
    });

   // Student CRUD Endpoints

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await studentCollection.find().toArray();
    res.status(200).json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
});

// Get a single student by ID
app.get('/api/students/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid student ID' });
  }

  try {
    const student = await studentCollection.findOne({ _id: new ObjectId(id) });
    student
      ? res.json(student)
      : res.status(404).json({ message: 'Student not found' });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student', error: err.message });
  }
});

// Add a new student
app.post('/api/students', async (req, res) => {
  const {
    studentName,
    studentID,
    password,
    age,
    gender,
    standard,
    section,
    contactNumber,
    email,
    address,
    guardianName,
    guardianContact,
    bloodGroup,
    dateOfBirth,
  } = req.body;

  // Validate input fields
  if (!studentName || !studentID || !password || !age || !gender || !standard || !section || !contactNumber || !email || !address || !guardianName || !guardianContact || !bloodGroup || !dateOfBirth) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the student already exists
    const existingStudent = await studentCollection.findOne({ studentID });
    if (existingStudent) {
      return res.status(409).json({ message: 'Student ID already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = {
      studentName,
      studentID,
      password: hashedPassword,
      age,
      gender,
      standard,
      section,
      contactNumber,
      email,
      address,
      guardianName,
      guardianContact,
      bloodGroup,
      dateOfBirth,
    };

    const result = await studentCollection.insertOne(newStudent);

    res.status(201).json({
      message: 'Student added successfully',
      studentDetails: {
        studentName,
        studentID,
        age,
        gender,
        standard,
        section,
        contactNumber,
        email,
        address,
        guardianName,
        guardianContact,
        bloodGroup,
        dateOfBirth,
        _id: result.insertedId,
      },
    });
  } catch (error) {
    console.error('Error adding student:', error.message);
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
});


// Update a student by studentID
app.put('/api/students/:studentID', async (req, res) => {
  const { studentID } = req.params;
  const {
    studentName,
    age,
    gender,
    standard,
    section,
    contactNumber,
    email,
    address,
    guardianName,
    guardianContact,
    bloodGroup,
    dateOfBirth
  } = req.body;

  // Validate input fields
  if (!studentName || !age || !gender || !standard || !section || !contactNumber || !email || !address || !guardianName || !guardianContact || !bloodGroup || !dateOfBirth) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedStudent = {
      $set: {
        studentName,
        age,
        gender,
        standard,
        section,
        contactNumber,
        email,
        address,
        guardianName,
        guardianContact,
        bloodGroup,
        dateOfBirth
      }
    };

    const result = await studentCollection.updateOne(
      { studentID },
      updatedStudent
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating student', error: err.message });
  }
});


// Delete a student by ID
// Delete a student by ID
app.delete('/api/students/:studentID', async (req, res) => {
  const { studentID } = req.params;

  try {
    const result = await studentCollection.deleteOne({ studentID });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
});



    // Event Endpoints
    app.get('/api/events', async (req, res) => {
      try {
        const events = await eventCollection.find().toArray();
        res.json(events);
      } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err.message });
      }
    });

    app.post('/api/events', async (req, res) => {
      const { name, date, location } = req.body;

      if (!name || !date || !location) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      try {
        const newEvent = { name, date: new Date(date), location };
        const result = await eventCollection.insertOne(newEvent);

        res.status(201).json({
          message: 'Event added successfully',
          eventDetails: { ...newEvent, _id: result.insertedId },
        });
      } catch (err) {
        res.status(500).json({ message: 'Error adding event', error: err.message });
      }
    });

    app.delete('/api/events/:id', async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }

      try {
        const result = await eventCollection.findOneAndDelete({ _id: new ObjectId(id) });

        if (!result.value) {
          return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error deleting event', error: err.message });
      }
    });

    // API Endpoint to Fetch All Events
app.get('/events', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const events = await collection.find().toArray();

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found.' });
    }

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events.' });
  } finally {
    await client.close();
  }
});

app.post('/api/events/participate', async (req, res) => {
  const { student_id, event_name } = req.body;

  // Check if both student_id and event_name are provided
  if (!student_id || !event_name) {
    return res.status(400).json({ message: 'Both student_id and event_name are required' });
  }

  try {
    // Step 1: Find the event by its name
    const event = await eventCollection.findOne({ name: event_name });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Step 2: Check if the student has already participated in the event
    if (event.participated_students && event.participated_students.includes(student_id)) {
      return res.status(400).json({ message: 'Student has already participated in this event' });
    }

    // Step 3: Add the student_id to the participated_students array
    const result = await eventCollection.updateOne(
      { name: event_name },
      { $addToSet: { participated_students: student_id } } // Adds student_id if it's not already present
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: 'Error updating participation' });
    }

    res.json({ message: 'Participation recorded successfully' });
  } catch (err) {
    console.error('Error in participation update:', err);
    res.status(500).json({ message: 'Error updating participation', error: err.message });
  }
});


  // Fetch all messages
  app.get('/api/messages', async (req, res) => {
    try {
      const messages = await messagesCollection.find().toArray();
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching messages', error: err.message });
    }
  });



 // Fetch all classes from the database
app.get('/classes', async (req, res) => {
  try {
    const ClassCollection = db.collection('Class');
    const classes = await ClassCollection.find().toArray();
    if (classes.length === 0) {
      return res.status(404).json({ error: 'No classes found' });
    }
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

// Get students by class name
app.get('/students/:className', async (req, res) => {
  const { className } = req.params;
  try {
    const classData = await ClassCollection.findOne({ className });
    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(classData.students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Submit attendance
app.post('/attendance', async (req, res) => {
  const { teacherID, className, attendance } = req.body;

  if (!teacherID || !className || !attendance || !attendance.length) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const teacher = await TeacherCollection.findOne({ teacher_id: teacherID });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    const result = await SAttendanceCollection.insertOne({
      teacherID,
      className,
      date: new Date(),
      attendance,
    });

    res.status(200).json({ message: 'Attendance submitted successfully', result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit attendance' });
  }
});

// Fetch attendance for a specific class
app.get('/attendance/:className', async (req, res) => {
  const { className } = req.params;
  try {
    const attendanceRecords = await SAttendanceCollection.find({ className }).toArray();
    if (!attendanceRecords.length) {
      return res.status(404).json({ error: 'No attendance records found for this class' });
    }
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
});

// API to store class data in `Class` collection
app.post('/classes', async (req, res) => {
  try {
    const { className, students } = req.body;

    // Validate request body
    if (!className || !Array.isArray(students)) {
      return res.status(400).json({ message: 'Invalid data format.' });
    }

    const ClassCollection = db.collection('Class');

    // Insert class data into collection
    const result = await ClassCollection.insertOne({ className, students });

    res.status(201).json({
      message: 'Class data stored successfully.',
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error('Error storing class data:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});




app.get('/student/:studentID', async (req, res) => {
  const { studentID } = req.params;
  console.log('Fetching student with ID:', studentID); // Log request

  try {
    const StudentCollection = db.collection('Student_info');
    const student = await StudentCollection.findOne({ studentID });
    
    console.log('Query result:', student); // Log result

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student information:', error); // Log error
    res.status(500).json({ error: 'Failed to fetch student information' });
  }
});

  } catch (error) {
    console.error('Error initializing MongoDB:', error);
  }
}



run();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
