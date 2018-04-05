const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const config = require('./config/database');

//mongo db set up
mongoose.connect(config.database);
mongoose.connection.on('connected', () => console.log(`Mongo is set and ready on address: ${config.database}`));
mongoose.connection.on('error', (err) => console.log(`Mongo had a problem: ${err}`));

const app = express();
app.use(cors());                                            //cross origin fix
app.use(bodyParser.json());                                 //json requests parser
app.use(express.static(path.join(__dirname, 'public')));    //client folder
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

const port = 3000;

app.get('/', (req, res)=>{
    console.log('someone is knocking.');
    res.send('Invalid route');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
} );