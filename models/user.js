
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    gender: Number,
    email: String,
    is_del:Boolean,
    cars:[{
    	type: Schema.Types.ObjectId,
    	ref: 'car'
    }]
})


module.exports = mongoose.model("user",userSchema);