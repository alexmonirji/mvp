const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost:27017/mvp');

const Movies = mongoose.model('Movies', {
	_id: Number,
	title: String,
	poster_path: String
});

const Users = mongoose.model('Users', {
	username: {
		type: String,
		unique: true,
		required: true,
		dropDups: true
	},
	password: String
});

module.exports = {
	saveMovie: (data) => {
		Movies.create({
			_id: data.id,
			title: data.title,
			poster_path: data.poster_path
		});
	},
	fetchMovies: () => {
		return Movies.find();
	},
	deleteMovie: (data) => {
		Movies.remove({ _id: data._id });
	},
	createUser: (data) => {
		bcrypt.hash(data.password, 10)
		.then((hash) => {
			Users.create({
				username: data.username,
				password: hash
			});
		})
		.catch((err) => {
			console.log('ERROR');
		});
	},
	checkUser: (data) => {
		return Users.find({ username: data.username })
		.then(([ { password } ]) => {
			return bcrypt.compare(data.password, password);
		})
		.catch((err) => {
			console.log('ERROR');
		});
	}
};