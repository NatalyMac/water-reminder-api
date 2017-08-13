
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const DrinksDayByDaySchema = new Schema({
    drinkId: {
        type: Schema.ObjectId,
        ref: 'Drink',
        Required: 'Id should be inserted'
    },

    user :{
        type: String,
    },

    total :{
        type: Number,
        default:1
    },
    // todo user model

    created_date: {
        type: String,
        default: new Date().toISOString()
    },
});

module.exports = mongoose.model('DrinksDayByDay', DrinksDayByDaySchema);