var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Expense', new Schema({ 
	id: String, 
	title: String, 
	amount: Number,
	date: Date,
	category: Object
}));