var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const malesRoutes = require('./routes/males_routes')
const femalesRoutes = require('./routes/females_routes')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/males',malesRoutes)
app.use('/api/females',femalesRoutes)


mongoose.connect("mongodb+srv://Ogie:text-pass@cluster0-bpb8z.mongodb.net/Dating_bkend?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true})
    .then( () => {
      app.listen(8000)
      console.log("connected");
    }).catch(()=>{

  console.log("Unable to connect to mongoDB")
})


module.exports = app;
