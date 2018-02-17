const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/../index.html/'));
});

app.post('/movies', (req, res) => {
	db.save(req.body.genre, (err, data) => {
		if (err) {
			throw err;
		}

		db.fetch((err, data) => {
			if (err) {
				throw err;
			}

			res.send(data);
		});
	});
});

app.get('/movies', (req, res) => {
	db.fetch((err, data) => {
		if (err) {
			throw err;
		}

		res.send(data);
	});
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log('Listening on port', PORT);
});