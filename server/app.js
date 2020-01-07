const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'SimpleBlog', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

mongoose.connect('MONGODB_IP_HERE', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

//Default homepage handler
app.get('/', function(req, res){
  // send() will dynamically send a json object if it receives or string
  // what send() really does is check if the parameter is string or object,
  // if it is an object it uses .json()
  //
  // but there is also res.json() which will send json only -- use .json to be more explicit
  res.json({message: 'This is the home page'});
  //res.send({message: 'you get json object!'});
})


// Add models
require('./models/Articles');


// Add routes
app.use(require('./routes'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const server = app.listen(8000, () => console.log('Server started on http://localhost:8000'));
