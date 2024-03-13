const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const superAdmin = require('./routes/super');
const pool = require('./database/db')

// Database
const connectDBMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDb database is connected successfully!');
  } catch (err) {
    console.log(err);
  }
};

const connectDB = async () => {
    try {
      await pool.connect();
      console.log("Postgres Database connected successfully!");
    } catch (err) {
      console.error("Error connecting to the database:", err.message);
    } finally {
      // Uncomment the following line if you want to release the connection immediately.
      // pool.end();
    }
  };


// Middlewares
dotenv.config();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/super/allUser', superAdmin);

// Image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, 'images');
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
    // fn(null, 'image1.jpg');
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  // console.log(req.body)
  res.status(200).json('Image has been uploaded successfully!');
});

app.listen(process.env.PORT, () => {
  connectDB();
  connectDBMongo();
  console.log('app is running on port ' + process.env.PORT);
});
