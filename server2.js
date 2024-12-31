const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
//const path = require('path');
const archiver = require('archiver'); // To zip files
//const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/dbs');
const app = express();
const PORT = 5002;

connectDB();
app.use(express.json());
app.use(cors());

// File Upload Setup (Store files in memory)
const storage = multer.memoryStorage(); // Store files in memory instead of disk
const upload = multer({ storage: storage });

// MongoDB StudyMaterials Collection Schema
const StudyMaterial = mongoose.model('StudyMaterial', new mongoose.Schema({
    className: String,
    subjectName: String,
    file: {
        data: Buffer,
        contentType: String
    }
}));

// Assignment Schema
const Assignment = mongoose.model('Assignment', new mongoose.Schema({
    teacherId: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    assignmentQuestion: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}));

// Route to Insert Study Material
app.post('/add-material', upload.single('file'), async (req, res) => {
    const { className, subjectName } = req.body;
    const file = req.file;

    if (!className || !subjectName || !file) {
        return res.status(400).json({ message: 'Class name, subject name, and file are required' });
    }

    const newMaterial = new StudyMaterial({
        className,
        subjectName,
        file: {
            data: file.buffer,
            contentType: file.mimetype
        }
    });

    try {
        await newMaterial.save();
        // Returning the file as base64 encoded string in the response
        const fileBase64 = file.buffer.toString('base64');
        res.json({ message: "Material added successfully", file: `data:${file.mimetype};base64,${fileBase64}` });
    } catch (err) {
        res.status(500).json({ message: "Error adding material", error: err });
    }
});

// Route to Fetch Study Material by Class Name and Subject Name
app.get('/get-materials', async (req, res) => {
    const { className, subjectName } = req.query;

    if (!className || !subjectName) {
        return res.status(400).json({ message: 'Class name and subject name are required' });
    }

    try {
        const materials = await StudyMaterial.find({ className, subjectName });

        if (materials.length > 0) {
            const materialList = materials.map(material => ({
                id: material._id,
                fileName: `${className}-${subjectName}.${material.file.contentType.split('/')[1]}`
            }));
            res.json(materialList);
        } else {
            res.status(404).json({ message: "No materials found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching materials", error: err });
    }
});

// Route to download Study Material
app.get('/download-material/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const material = await StudyMaterial.findById(id);

        if (material) {
            res.set({
                'Content-Type': material.file.contentType,
                'Content-Disposition': `attachment; filename="${material.fileName || 'download'}"`
            });

            res.send(material.file.data);
        } else {
            res.status(404).json({ message: "Material not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error downloading material", error: err });
    }
});

// Route to Upload Assignment
app.post('/upload-assignment', async (req, res) => {
    const { teacherId, className, subjectName, assignmentQuestion } = req.body;

    // Validation for the fields
    if (!teacherId || !className || !subjectName || !assignmentQuestion) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newAssignment = new Assignment({
            teacherId,
            className,
            subjectName,
            assignmentQuestion
        });

        // Save the assignment to the database
        await newAssignment.save();

        res.status(201).json({ message: 'Assignment uploaded successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading assignment.', error: error.message });
    }
});


const AssignmentUpload = mongoose.model('AssignmentUpload', new mongoose.Schema({
    studentId: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    assignmentTitle: {
      type: String,
      required: true,
    },
    file: {
      data: Buffer,
      contentType: String,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }));
  
  app.post('/studentAssignments/upload', upload.single('file'), async (req, res) => {
    const { studentId, className, subjectName, assignmentTitle } = req.body;
    const file = req.file;
  
    // Validate the input fields
    if (!studentId || !className || !subjectName || !assignmentTitle || !file) {
      return res.status(400).json({ message: 'All fields are required, including a file.' });
    }
  
    try {
      // Create a new assignment upload document
      const newAssignmentUpload = new AssignmentUpload({
        studentId,
        className,
        subjectName,
        assignmentTitle,
        file: {
          data: file.buffer,
          contentType: file.mimetype,
        },
      });
  
      // Save the document to the database
      await newAssignmentUpload.save();
      res.status(201).json({ message: 'Assignment uploaded successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading assignment.', error: error.message });
    }
  });
  


// Define the Schema
const AssignmentSchema = new mongoose.Schema({
    teacherId: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    assignmentQuestion: {
      type: String,
      required: true,
    },
  });
  
  const Assignments = mongoose.model('assignments', AssignmentSchema);
  
  // API to fetch assignments by className and subjectName
  app.get('/assignments', async (req, res) => {
    const { className, subjectName } = req.query;
  
    if (!className || !subjectName) {
      return res.status(400).json({ message: 'Both className and subjectName are required.' });
    }
  
    try {
      const assignments = await Assignments.find({ className, subjectName });
  
      if (!assignments.length) {
        return res.status(404).json({ message: 'No assignments found for the provided className and subjectName.' });
      }
  
      res.status(200).json(assignments.map(assignment => ({
        teacherId: assignment.teacherId,
        assignmentQuestion: assignment.assignmentQuestion,
      })));
    } catch (error) {
      res.status(500).json({ message: 'Error fetching assignments.', error: error.message });
    }
  });

  
// Define the AssignmentUpload schema (Replace this with your actual schema if different)
const assignmentUploadSchema = new mongoose.Schema({
    studentId: String,
    className: String,
    subjectName: String,
    assignmentTitle: String,
    file: {
        filename: String,
        contentType: String,
        path: String
    }
});

const AssignmentUploads = mongoose.model('assignmentuploads', assignmentUploadSchema);

// API to fetch studentId, assignmentTitle, and file by className and subjectName
app.get('/fetch-assignment', async (req, res) => {
    const { className, subjectName } = req.query;

    try {
        // Find the assignment(s) based on className and subjectName
        const assignments = await AssignmentUploads.find({
            className: className,
            subjectName: subjectName
        });

        if (assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for the given className and subjectName.' });
        }

        // Return the required fields: studentId, assignmentTitle, and file path
        const assignmentDetails = assignments.map(assignment => ({
            studentId: assignment.studentId,
            assignmentTitle: assignment.assignmentTitle,
            file: assignment.file // You can include the file details or path based on your requirement
        }));

        res.status(200).json(assignmentDetails);

    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
