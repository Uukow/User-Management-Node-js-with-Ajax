// routes/index.js for general routes
const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the index.html file when users access the root path ("/")
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});


router.get('/user', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/user.html'));
})
router.get('/dashboard', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
})
router.get('/employees', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/employees.html'));
})
router.get('/dashshboardUser', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/employees.html'));
})
router.get('/dashboardEmployees', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/employees.html'));
})




module.exports = router;
