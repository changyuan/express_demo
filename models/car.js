const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//这里写成[]是单个，写成这个是多个[{}]
const carSchema = new Schema({
    make: String,
    model: String,
    year: Number,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Car  = mongoose.model("car",carSchema);

module.exports = Car;