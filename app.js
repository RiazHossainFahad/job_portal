var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var expressValidator = require('express-validator');
var signup = require.main.require('./controllers/signup');
var login = require.main.require('./controllers/login');
var rectuiterHome = require.main.require('./controllers/recruiter');
var job = require.main.require('./controllers/job');
var adminHome = require.main.require('./controllers/admin');
var applicantHome = require.main.require('./controllers/applicant');
var logout = require.main.require('./controllers/logout');

var app = express();

//CONFIGERATION
app.set('view engine', 'ejs');


//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
//to use bootstrap as fake folder name /bootstrap
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
//to use jquery as fake folder name /jquery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(express.static("public")); //for static file like images or other files
app.use(expressSession({ secret: 'super secret', saveUninitialized: true, resave: false }));
app.use(expressValidator());

app.use('/signup', signup);
app.use('/login', login);
app.use('/home-recruiter', rectuiterHome);
app.use('/job', job);
app.use('/home-admin', adminHome);
app.use('/home-applicant', applicantHome);
app.use('/logout', logout);

//ROUTES
app.get('/', function(req, res) {
    var err = {
        errors: req.session.errors
    };
    req.session.errors = null;
    res.render('index', err);
});

//server listen
app.listen(4000, () => {
    console.log("server started at port 4000......");
});