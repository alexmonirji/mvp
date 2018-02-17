const config = require('../config.js');
const axios = require('axios');

module.exports = (query) => 
	axios.get('https://api.themoviedb.org/3/search/movie', {
	params: {
		include_adult: true,
		query: query,
		api_key: config.API_KEY
	}
});