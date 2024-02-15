// dashboard.js
const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

// Route to render the dashboard with the total number of rooms
router.get('/dashshboardUser', (req, res) => {
    // Query to get the total number of rooms
    const query = 'SELECT COUNT(*) as totalUsers FROM user';
    // Execute the query
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      // Process the result and send HTML as a response
      const totalUsers = results[0].totalUsers || 0;
      // Send the dashboard data with the totalRooms value
      res.send({data: totalUsers});
    });
  });
// Route to render the dashboard with the total number of rooms
router.get('/dashboardEmployees', (req, res) => {
    // Query to get the total number of rooms
    const query = 'SELECT COUNT(*) as totalEmployees FROM employees';
    // Execute the query
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      // Process the result and send HTML as a response
      const totalEmployees = results[0].totalEmployees || 0;
      // Send the dashboard data with the totalRooms value
      res.send({data: totalEmployees});
    });
  });

 

  module.exports = router;