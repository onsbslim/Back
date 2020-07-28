var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var candidatesRouter = require('./routes/candidates');
var companiesRouter = require('./routes/companies');
var interviewsRouter = require('./routes/interviews');
var questionsRouter = require('./routes/questions');
var applicationsRouter = require('./routes/applications');
var answersRouter = require('./routes/answers');
var multer  = require('multer');

require("dotenv").config();

var app = express();

//var jwt = require('jsonwebtoken');  


var passport = require('passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/candidates', candidatesRouter);
app.use('/companies', companiesRouter);
app.use('/interviews', interviewsRouter);
app.use('/questions', questionsRouter);
app.use('/applications', applicationsRouter);
app.use('/answers', answersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
