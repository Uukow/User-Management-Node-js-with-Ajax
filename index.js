const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 4000; //


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Your existing routes for general pages (e.g., index, about, contact)
app.use('/', require('./routes/index'));



app.use('/api', require('./user'));
app.use('/api', require('./employees'));
app.use('/api', require('./dashboard'));

app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
