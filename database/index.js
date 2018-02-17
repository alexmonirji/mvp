const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mvp');

const Movies = mongoose.model('Movies', {
	_id: Number,
	title: String,
	poster_path: String
});

module.exports = {
	save: (data) => {
		return new Promise((resolve, reject) => {
			let movies = [{
				_id: data.id,
				title: data.title,
				poster_path: data.poster_path
			}];

			Movies.insertMany(movies, {
				ordered: false
			})
			.then((data) =>
				resolve(data))
			.catch((err) =>
				reject(err));
		});
	},
	fetch: () => {
		return Movies.find()
	},
	delete: (data) => {
		return new Promise((resolve, reject) => {
			Movies.remove({
				_id: data._id
			}, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
};