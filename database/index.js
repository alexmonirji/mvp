const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mvp');

const Something = mongoose.model('Something', {

});

module.exports = {
	save: (data, callback) => {
		
	},
	fetch: (callback) => {
		
	}
};