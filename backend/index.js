const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB sathe connect thava mate
mongoose.connect('mongodb://127.0.0.1:27017/nobleDB');

const ResultSchema = new mongoose.Schema({
    name: String,
    enrollmentNo: { type: String, unique: true },
    courseCode: { type: String, default: "NOBLE-101" },
    branch: String,
    semester: Number,
    classAttended: { type: String, default: "45/50" },
    subjects: [{ sname: String, marks: Number }], 
    cpi: Number, 
    password: { type: String, default: "123" } 
});

const Result = mongoose.model('Result', ResultSchema);

// 1. Student & Admin Login API (FIXED: Added subjects in response)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body; 

    if (email === "admin@noble.com" && password === "admin123") {
        return res.json({ role: 'admin', success: true, user: { name: 'Admin' } });
    }

    const student = await Result.findOne({ enrollmentNo: email, password: password });
    if (student) {
        res.json({ 
            success: true, 
            user: { 
                role: 'student',
                name: student.name,
                enrollmentNo: student.enrollmentNo,
                branch: student.branch,
                semester: student.semester,
                cpi: student.cpi,
                courseCode: student.courseCode,
                classAttended: student.classAttended,
                subjects: student.subjects // AA FIX KARYU: Have subjects dekhase
            }
        });
    } else {
        res.status(401).json({ success: false, message: "Invalid ID or Password" });
    }
});

// 2. Result Add karvani API
app.post('/api/add-student', async (req, res) => {
    try {
        const newResult = new Result(req.body);
        await newResult.save();
        res.json({ success: true, message: "Result Saved!" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Error or Duplicate Enrollment" });
    }
});

// 3. STUDENT LIST FETCH KARVANI API
app.get('/api/students', async (req, res) => {
    try {
        const students = await Result.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: "Data fetch karva ma error che" });
    }
});

// 4. DELETE Student API (Tamara AllStudents.jsx mate)
app.delete('/api/students/:id', async (req, res) => {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// 5. UPDATE Student API (Edit feature mate)
app.put('/api/students/:id', async (req, res) => {
    try {
        const updated = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ message: "Update error" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));