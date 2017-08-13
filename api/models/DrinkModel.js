
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const DrinkSchema = new Schema({
    title: {
        type: String,
        Required: 'Kindly enter the name of the drink'
    },

    hydro: {
        type: Number,
        Required: 'It is nesseccary to know hydro of the drink'
    },

    volume: {
        type: Number,
        Required: 'It is nesseccary to know volume of the drink'
    },

    created_date: {
        type: String,
        default: new Date().toISOString()
    }
});

module.exports = mongoose.model('Drink', DrinkSchema);