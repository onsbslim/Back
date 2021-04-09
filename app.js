var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var axios = require('axios');
var ip = require('./middleware/IP');
var socket_io = require("socket.io");
const jwt = require('jsonwebtoken');

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
var notificationsRouter = require('./routes/notifications');
var messagenNotificationsRouter = require('./routes/messageNotifications');

const db = require('./models');

const auth = require('./middleware/auth');

function capitalizeTheFirstLetterOfEachWord(words) {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}
//require("dotenv").config({ silent: process.env.NODE_ENV === 'production' });
//require("dotenv").config();
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
var app = express();

var passport = require('passport');
const { decode } = require('querystring');

// Socket.io
var io = socket_io();
app.io = io;

// socket.io events
var companyId, candidateId;
io.on("connection", socket => {

  //console.log("socket id: " + socket.id);
  console.log('A new user has joined');


  socket.on('setRoom', (idCompany, idCandidate) => {
    idComp = idCompany;
    idCand = idCandidate;
    socket.join(idComp + '-' + idCand);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.broadcast.to(idComp + '-' + idCand).on('send', (msg, idCandidate, sender) => {
    const token = socket.handshake.query['Authorization'];
    const decoded = jwt.verify(token, process.env.KEY);
  //  var idComp = decoded.id;
    var companyId, candidateId;
    companyId = decoded.id;
    candidateId = idCandidate;
    
    const urlLinkup = ip + "/messages/addMessage";
    //var urlGetCompanyLinkup = ip + "/companies/" + idComp;
    var urlGetCandidateLinkup= ip + "/candidates/" + idCandidate;
    var urlOneSignal = "https://onesignal.com/api/v1/notifications";


    
    const headersLinkup = {
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
    

    axios.post(urlLinkup, data, { headers: headersLinkup }).then(res => {
      
      axios.get(urlGetCandidateLinkup, { headers: headersLinkup }).then(result => {
        var candidateName;
        candidateName = result["data"]["candidate"]["firstname"] + " " + result["data"]["candidate"]["lastname"];
      
        var players = ["Interviewee-" + result["data"]["candidate"]["id"]];
        console.log("players : "+players);
        var app_id = "4afd2f1e-b5f1-4050-bd54-fb343e765d2f";
        var contents = { "en": msg };
        var headings = { "en": capitalizeTheFirstLetterOfEachWord(candidateName) };
        var dataOneSignal = {
          "include_external_user_ids": players,
          "app_id": app_id,
          "contents": contents,
          "headings": headings,
          "content_available": 1,
        };
        const headersIntervieweeOneSignal = {
          "Accept": "*/*",
          "Content-Type": "application/json",
          "Authorization": "Basic YWQ0YzVmYWEtNzdhYy00ODM5LWE1YzgtMzA4NzIzYTkxMGRj"
        };
        axios.post(urlOneSignal, dataOneSignal, { headers: headersIntervieweeOneSignal }).then(oneSignalResult => {
          var urlNotification = ip + "/messageNotifications/add";
          var dataNotification = {
            "id": oneSignalResult["data"]["id"],
            "candidateId": candidateId,
            "companyId": companyId,
            "receiver": "candidate"
          };

          axios.post(urlNotification,dataNotification,{headers: headersLinkup}).then(resAdd => {
            console.log("notification created!");
          });
        });


      });

      io.emit('reload');
    }).catch(err => console.log("erroor :" + err));

  });

  socket.broadcast.to(idComp + '-' + idCand).on('sendFromCandidate', (msg, idCompany, sender) => {
    const token = socket.handshake.query['Authorization'];
    const decoded = jwt.verify(token, process.env.KEY);
    //var idCand = decoded.id;
    var companyId, candidateId;
    companyId = idCompany;
    candidateId = decode.id;
    const urlInterviewee = ip + "/messages/candidateAddMessage";
    var urlGetCompanyInterviewee = ip + "/companies/" + idCompany;
   // var urlGetCandidateInterviewee = ip + "/candidates/" + idCand;
    var urlOneSignal = "https://onesignal.com/api/v1/notifications";

    
    const headersInterviewee = {
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


   
     axios.post(urlInterviewee, data, { headers: headersInterviewee }).then(res => {
      
      axios.get(urlGetCompanyInterviewee, { headers: headersInterviewee }).then(result => {
      var companyName;
       companyName = result["data"]["company"]["name"];
        
        var players = ["Linkup-" + result["data"]["company"]["id"]];
        var app_id = "a876b4ca-17fc-4710-b22f-32e52bb59a6c";
        var contents = { "en": msg };
        var headings = { "en": capitalizeTheFirstLetterOfEachWord(companyName) };
        var dataOneSignal = {
          "include_external_user_ids": players,
          "app_id": app_id,
          "contents": contents,
          "headings": headings,
          "content_available": 1,
        };
        const headersLinkupOneSignal = {
          "Accept": "*/*",
          "Content-Type": "application/json",
          "Authorization": "Basic MGIzYjIyN2YtYTY0OS00ZjNlLWE3MzktMGRiMTM5NjRmNjc1"
        };
        axios.post(urlOneSignal, dataOneSignal, { headers: headersLinkupOneSignal }).then(oneSignalResult => {
          var urlNotification = ip + "/messageNotifications/add";
          var dataNotification = {
            "id": oneSignalResult["data"]["id"],
            "candidateId": candidateId,
            "companyId": companyId,
            "receiver": "company"
          };

          axios.post(urlNotification,dataNotification,{headers: headersInterviewee}).then(resAdd => {
            console.log("notification created!");
          });

        });


      });
      io.emit('reload');

    }).catch(err => console.log(err));

  });


  socket.on('candidateDiscussions', (st) => {

    const url = ip + "/messages/candidateDiscussions";

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


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session({
  resave: true,
  saveUninitialized: true
}));

//app.use(adminBro.options.rootPath, router);


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
app.use('/notifications', notificationsRouter);
app.use('/messageNotifications', messagenNotificationsRouter);

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
