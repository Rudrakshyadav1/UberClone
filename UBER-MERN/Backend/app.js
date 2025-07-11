const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const app = express();
// Connect to MongoDB
const connectToDb = require('./db/db');
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');
app.use('/maps',mapRoutes);
app.use('/ride',rideRoutes);
app.use('/captain',captainRoutes);
app.use('/user', userRoutes); 
// // Test route
// app.get('/', (req, res) => {
//     res.send("HELLO WORLD !!!");
// });
// app.get('/test-cookie', (req, res) => {
//     res.cookie('token', 'test123'); // simple cookie
//     res.send('Cookie set');
//   });
  
module.exports = app;
