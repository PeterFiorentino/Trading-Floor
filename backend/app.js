var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('./auth/passport');
const bodyParser = require('body-parser');

if(process.env.NODE_ENV !== "production")  {
    require('dotenv').config()
}

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const transactionRouter = require('./routes/transactions');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "/../client/build")));
app.use(cors())
app.use(express.json());
app.use(cookieParser("NOT_A_GOOD_SECRET"));



app.use(session({
    secret: "NOT_A_GOOD_SECRET",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter)
app.use('/api/transactions', transactionRouter);

module.exports = app;
