const express = require('express');
const tmdb = require('../helpers/tmdb.js');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/../index.html/'));
});

app.post('/movies', (req, res) => {
	db.saveMovie(req.body.movie)
	.then(() => {
		res.sendStatus(200);
	})
	.catch((err) => {
		res.sendStatus(404);
	});
});

app.get('/movies', (req, res) => {
	tmdb(req.query.query)
	.then((data) => {
		data = JSON.stringify(data.data);
		res.send(data);
	})
	.catch((err) => {
		res.sendStatus(404);
	});
});

app.post('/favorites', (req, res) => {
	db.deleteMovie(req.body.movie)
	.then(() => {
		res.sendStatus(200);
	})
	.catch((err) => {
		res.sendStatus(404);
	});
});

app.get('/favorites', (req, res) => {
	db.fetchMovies()
	.then((data) => {
		data = JSON.stringify(data);
		res.send(data);
	})
	.catch((err) => {
		res.sendStatus(404);
	});
});

app.post('/signup', (req, res) => {
	db.createUser(req.body.user)
	.then(() => {
		res.sendStatus(200);
	})
	.catch((err) => {
		res.sendStatus(404);
	});
});

app.post('/login', (req, res) => {
	db.checkUser(req.body.user)
	.then((data) => {
		if (data) {
			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	})
	.catch((err) => {
		console.log('ERROR');
	});
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log('Listening on port', PORT);
});