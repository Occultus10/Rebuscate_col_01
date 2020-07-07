const http = require('http');
const express 	= require('express');
const socketio = require('socket.io');
const path 		= require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const expressValidator = require('express-validator');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);


require('./database');
require('./config/passport');



app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partial'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

 app.use(session({
 secret: 'secret',
 resave: true,
 saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error_x');
 
  res.locals.user = req.user || null;
  next();
});


app.use(require('./routes'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/vacantes'));
app.use(require('./routes/notes'));


app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});