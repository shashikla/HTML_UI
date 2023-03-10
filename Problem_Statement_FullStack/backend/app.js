const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const User = require("./src/models/register");
const rtsIndex = require("./src/routes/users.router")

const app = express();

require('./src/config/config');
require('./src/config/passportConfig');
require("./src/db/conn");

const port = process.env.PORT || '3000';

app.get("/", (req, res) => {
    res.send("Hello from NodeJS");
});

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api',rtsIndex);

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})

