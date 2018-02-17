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
	db.save(req.body.movie)
	.then((data) => {
		data = JSON.stringify(data);
		res.send(data);
	})
	.catch((err) =>
		res.sendStatus(404)
	)
});

app.get('/movies', (req, res) =>
	tmdb(req.query.query)
	.then((data) => {
		data = JSON.stringify(data.data);
		res.send(data);
	})
	.catch((err) =>
		res.sendStatus(404)
	)
);

app.post('/favorite', (req, res) =>
	db.delete(req.body.movie)
	.then((data) => {
		data = JSON.stringify(data);
		res.send(data);
	})
	.catch((err) => {
		console.log('error');
		res.sendStatus(404)
	})
);

app.get('/favorite', (req, res) =>
	db.fetch()
	.then((data) => {
		data = JSON.stringify(data);
		res.send(data);
	})
	.catch((err) =>
		res.sendStatus(404)
	)
);

const PORT = 3000;
app.listen(PORT, () => {
	console.log('Listening on port', PORT);
});