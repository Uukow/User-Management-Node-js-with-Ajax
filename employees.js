const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 40002;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// Register the employees
router.post('/registerEmployees', (req, res) => {
    const { name, possition, sallary, phone, email, location } = req.body;

    const query = `CALL sp_employees('', '${name}', '${possition}', '${sallary}', '${phone}', '${email}', '${location}')`;

    db.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: 'Registration successful' });
        }
    });
});

// Update the employees
router.post('/updateEmployees', (req, res) => {
    const { update_id, name, possition, sallary, phone, email, location } = req.body;

    const query = `CALL sp_employees('${update_id}', '${name}', '${possition}', '${sallary}', '${phone}', '${email}', '${location}')`;

    db.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            const row = results[0][0];
            if (row.Message === 'Updated') {
                res.json({ status: true, data: 'Updated successful' });
            } else {
                res.json({ status: false, data: err });
            }
        }
    });
});

// Read all employees
router.get('/getEmployees', (req, res) => {
    const query = 'SELECT * FROM employees';

    db.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: results });
        }
    });
});

// Get one employee
router.post('/getEmployeesInfo', (req, res) => {
    const { id } = req.body;

    const query = `SELECT * FROM employees WHERE id = '${id}'`;

    db.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: results[0] });
        }
    });
});

// Delete one employee
router.post('/deleteEmployeesInfo', (req, res) => {
    const { id } = req.body;

    const query = `DELETE FROM employees WHERE id = '${id}'`;

    db.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: 'Deleted successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = router;