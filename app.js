const expres = require('express');
const path = require('path');
const bodyParser = require('bosy-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const port = 6969;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
} );