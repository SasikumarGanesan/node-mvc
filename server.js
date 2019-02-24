require('./_server/config/config');
require('./_server/models/db');
require('./_server/config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const routeIndex = require('./_server/routes/index.router');

var app = express();
let usersCount;

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(passport.initialize());

app.get('/', (req, res) => {
    // res.sendfile(path.join(__dirname, 'dist/index.html'));
    res.json({Name: "Mvc setup", version: '1.0.0', message: 'Welcome to the Setup'});
  });

app.use('/api', routeIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }

});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT} and pid: ${process.pid}`));


process.on('message', msg => {
  usersCount = msg.usersCount;
});


// setTimeout(() => {
//   process.exit(1); // death by random timeout
// }, Math.random() * 10000);
