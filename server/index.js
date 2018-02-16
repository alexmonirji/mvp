const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', (req, res) => {

});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/../index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log('Listening on port', PORT);
});