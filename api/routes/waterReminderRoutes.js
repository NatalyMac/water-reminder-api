'use strict';
module.exports = function(app) {

    const waterReminder = require('../controllers/waterReminderController');


    // reminder Routes
    app.route('/api/drinks')
        .get(waterReminder.index_drinks)
        .post(waterReminder.create_drink);


    app.route('/api/drinks/:drinkId')
        .get(waterReminder.view_drink)
        .put(waterReminder.update_drink)
        .delete(waterReminder.delete_drink);

    app.route('/api/drinks-user')
         .get(waterReminder.index_user_drinks_today)
         .post(waterReminder.create_user_drink);

    //todo per user
};