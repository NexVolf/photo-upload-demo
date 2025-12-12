const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Shreyansh@262008', // Replace with your MySQL password
  database: 'photo_upload_mvp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Upload endpoint
app.post('/upload', upload.single('photo'), async (req, res) => {
  const { datetime, description } = req.body;
  const { path: photoPath } = req.file;

  try {
    const [result] = await pool.query(
      'INSERT INTO photos (path, datetime, description) VALUES (?, ?, ?)',
      [photoPath, datetime, description]
    );
    res.send({ success: true, message: 'Photo uploaded successfully!' });
  } catch (err) {
    console.error('Error saving to database:', err);
    res.status(500).send({ success: false, message: 'Error saving to database' });
  }
});

// Get all photos
app.get('/photos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM photos');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching photos:', err);
    res.status(500).send({ success: false, message: 'Error fetching photos' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
