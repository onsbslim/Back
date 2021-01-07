var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var axios = require('axios');
var ip = require('./middleware/IP');
var socket_io = require("socket.io");

var AdminBro = require('admin-bro');
var AdminBroExpressjs = require('admin-bro-expressjs');
var AdminBroSequelize = require('@admin-bro/sequelize');

var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var candidatesRouter = require('./routes/candidates');
var companiesRouter = require('./routes/companies');
var interviewsRouter = require('./routes/interviews');
var questionsRouter = require('./routes/questions');
var applicationsRouter = require('./routes/applications');
var answersRouter = require('./routes/answers');
var messagesRouter = require('./routes/messages');
var skillsRouter = require('./routes/skills');
var candidateSkillRouter = require('./routes/candidateSkill');
var interviewSkillRouter = require('./routes/InterviewSkill');

const db = require('./models');

const auth = require('./middleware/auth');


require("dotenv").config({ silent: process.env.NODE_ENV === 'production' });

var app = express();

var passport = require('passport');

// Socket.io
var io = socket_io();
app.io = io;

// socket.io events

io.on("connection", socket => {

  //console.log("socket id: " + socket.id);
  console.log('A new user has joined');


  var idComp, idCand;

  socket.on('setRoom', (idCompany, idCandidate) => {
    idComp = idCompany;
    idCand = idCandidate;
    socket.join(idComp + '-' + idCand);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.broadcast.to(idComp + '-' + idCand).on('send', (msg, idCandidate, sender) => {
    const url = ip+"/messages/addMessage";
    const token = socket.handshake.query['Authorization'];
    const headers = {
      "Accept": "*/*",
      "x-auth-token": token,
      "Content-Type": "application/json"
    };
    io.emit('reload');
    const data = {
      "idCandidate": idCandidate,
      "message": msg,
      "sender": sender
    };

    axios.post(url, data, { headers: headers }).then(res => {
      io.emit('reload');
    }).catch(err => console.log(err));

  });

  socket.broadcast.to(idComp + '-' + idCand).on('sendFromCandidate', (msg, idCompany, sender) => {
    const url = ip+"/messages/candidateAddMessage";
    const token = socket.handshake.query['Authorization'];
    const headers = {
      "Accept": "*/*",
      "x-auth-token": token,
      "Content-Type": "application/json"
    };
    io.emit('reload');
    const data = {
      "idCompany": idCompany,
      "message": msg,
      "sender": sender
    };

    axios.post(url, data, { headers: headers }).then(res => {
      io.emit('reload');
    }).catch(err => console.log(err));

  });
  

  socket.on('candidateDiscussions', (st) => {
    
    const url = ip+"/messages/candidateDiscussions";

    const headers = {
      "Accept": "*/*",
      "x-auth-token": token,
      "Content-Type": "application/json"
    };
    socket.emit('discussions', res);
    axios.post(url, { headers: headers }).then(res => {
      console.log(res);
      socket.emit('discussions', res);
    }).catch(err => console.log(err));
  });

});


//Admin Panel
AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
  databases: [db],
  rootPath: '/admin',
  branding: {
    logo: ip+'/images/icon.png',
    companyName: 'Linkup',
    softwareBrothers: false   // if Software Brothers logos should be shown in the sidebar footer
  },
  dashboard: {
    handler: async () => {
      return { some: 'output' }
    },
    component: AdminBro.bundle('./admin/my-dashboard-component')
  },
});


const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro,{
  authenticate: async (email, password) => {
    try{
    const user = await db.candidates.findOne({ where: {
			email: email
		} });
    console.log("user: "+ user);

      if (user) {
        if (user.validPassword(password) && user.role == "admin") {
          return user;
        }
      }
    }catch(err){
      console.log(err);
    }
    return false;
  },
  cookiePassword: 'session Key',
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(adminBro.options.rootPath, router);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', indexRouter);
app.use('/candidates', candidatesRouter);
app.use('/companies', companiesRouter);
app.use('/interviews', interviewsRouter);
app.use('/questions', questionsRouter);
app.use('/applications', applicationsRouter);
app.use('/answers', answersRouter);
app.use('/messages', messagesRouter);
app.use('/skills', skillsRouter);
app.use('/candidatesSkills', candidateSkillRouter);
app.use('/interviewsSkills', interviewSkillRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
