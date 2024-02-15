const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 40003;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});

conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + conn.threadId);
});

// Register the employees
router.post('/registerUsers', (req, res) => {
    const { name, username, password, role, statuss, email } = req.body;

    const query = `CALL sp_user('','${name}', '${username}', '${password}', '${role}', '${statuss}', '${email}')`;

    conn.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: 'Registration successful' });
        }
    });
});

// Update the employees
router.post('/updateUsers', (req, res) => {
    const { update_id, name, username, password, role, statuss, email } = req.body;

    const query = `CALL sp_user('${update_id}', '${name}', '${username}', '${password}', '${role}', '${statuss}', '${email}')`;

    conn.query(query, (err, results) => {
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
router.get('/getUsers', (req, res) => {
    const query = 'SELECT * FROM user';

    conn.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: results });
        }
    });
});

// Get one employee
router.post('/getUsersInfo', (req, res) => {
    const { id } = req.body;

    const query = `SELECT * FROM user WHERE id = '${id}'`;

    conn.query(query, (err, results) => {
        if (err) {
            res.json({ status: false, data: err });
        } else {
            res.json({ status: true, data: results[0] });
        }
    });
});

// Delete one employee
router.post('/deleteUsersInfo', (req, res) => {
    const { id } = req.body;

    const query = `DELETE FROM user WHERE id = '${id}'`;

    conn.query(query, (err, results) => {
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