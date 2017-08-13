console.log('May Node be with you');

const
    port = process.env.PORT || 3005,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = require('express')(),
    server = app.listen(port),
    io = require('socket.io')(server),


    routes = require('./api/routes/waterReminderRoutes'),
    Drink = require('./api/models/DrinkModel'),
    DrinksDayByDay = require('./api/models/DrinksDayByDayModel');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/water-reminder');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

routes(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
});
