'use strict';

const mongoose = require('mongoose'),
      Drink = mongoose.model('Drink'),
      DrinksDayByDay = mongoose.model('DrinksDayByDay');


exports.index_drinks = function(req, res) {
    Drink.find({}, function(err, drink) {
        if (err)
            res.send(err);
        res.json(drink);
    });
};


exports.create_drink = function(req, res) {
    let  new_drink = new Drink(req.body);
    new_drink.save(function(err, drink) {
        if (err)
            res.send(err);
        res.json(drink);
    });
};


exports.view_drink = function(req, res) {
    Drink.findById(req.params.drinkId, function(err, drink) {
        if (err)
            res.send(err);
        res.json(drink);
    });
};


exports.update_drink = function(req, res) {
    Drink.findOneAndUpdate({_id: req.params.drinkId}, req.body, {new: true}, function(err, drink) {
        if (err)
            res.send(err);
        res.json(drink);
    });
};


exports.delete_drink = function(req, res) {
    DrinksDayByDay.findOne({drinkId: req.params.drinkId}, function(err, result){
        if (result){
            res.json(400);
        } else {
            Drink.remove({
                _id: req.params.drinkId
            }, function(err, result) {
                if (err)
                    res.send(err);
                res.json({ message: 'Drink successfully deleted' });
            });
        }
    });

};


exports.index_user_drinks_today = function(req, res) {
    //todo find for user too
    let today = new Date().toISOString().split('T')[0];
    console.log(today);
    DrinksDayByDay.find({"created_date": {$regex: today}}, function(err, result){
        console.log('!-------');
        //console.log(result);
    });
    DrinksDayByDay.aggregate([
        { $match: {
            "created_date": {$regex: today}
        }},
        {
                $group: {
                _id: "$drinkId",
                user : { $first: '$user' },
                drinkId : { $first: '$drinkId' },
                total: { $sum: 1 }
                }
            },
        ],
        function(err,results) {
       // console.log(results);
            results = results.map(function(result) {
                return new DrinksDayByDay( result );
            });
            DrinksDayByDay.populate(results, "drinkId",function(err,results) {
                return res.json(results)
            });
        }
    )
};


exports.create_user_drink = function(req, res) {
    let  new_drink_user = new DrinksDayByDay(req.body);
    new_drink_user.save(function(err, drink_user) {
        if (err)
            res.send(err);
        res.json(drink_user);
    });
};