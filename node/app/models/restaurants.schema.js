var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var restaurantSchema = new Schema({
	address: {
		building: {
			type: 'Number',
			required: true
		},
		coord: {
			type: [
				'Number'
			],
			required: true
		},
		street: {
			type: 'String',
			required: true
		},
		zipcode: {
			type: 'Number',
			required: true
		}
	},
	borough: {
		type: 'String'
	},
	cuisine: {
		type: 'String',
		required: true
	},
	grades: {
		type: [
			'Mixed'
		]
	},
	name: {
		type: 'String',
		required: true
	},
	restaurant_id: {
		type: 'String',
		required: true,
		unique: true
	}
});


var restaurant = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurant;