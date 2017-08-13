console.log('May Node be with you');

const express = require('express'),
      app = express(),
      port = process.env.PORT || 3005,
      routes = require('./api/routes/waterReminderRoutes'),
      mongoose = require('mongoose'),
      Drink = require('./api/models/DrinkModel'),
      DrinksDayByDay = require('./api/models/DrinksDayByDayModel'),
      bodyParser = require('body-parser');


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

app.listen(port, function() {
    console.log('listening on ' + port)
});
