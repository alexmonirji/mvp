import React from 'react';
import axios from 'axios';
import MovieList from './MovieList.jsx';
import FavoriteList from './FavoriteList.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);

		let context = this;

		this.state = {
			query: '',
			movies: [],
			favorites: []
		};

		axios.get('/favorite')
		.then((data) =>
			context.setState({
				favorites: data.data
			})
		);

		this.search = this.search.bind(this);
		this.change = this.change.bind(this);
	}

	change(e) {
		this.setState({
			query: e.target.value
		});
	}

	search(query) {
		let context = this;
		
		axios.get('/movies', {
			params: {
				query: query
			}
		})
		.then((data) => {
			context.setState({
				movies: data.data.results
			});
		})
		.catch((err) => {
			alert('Invalid keyword or already searched!');
		});
	}

	addToFavorites(movie) {
		let context = this;

		axios.post('/movies', {
			movie: movie
		})
		.then(() =>
			axios.get('/favorite')
			.then((data) => {
				let movies = context.state.movies;
				let ids = movies.map((movie) => movie.id);
				let index = ids.indexOf(movie.id);
				movies.splice(index, 1);

				context.setState({
					favorites: data.data,
					movies: movies
				});
			}).catch((err) =>
				alert('Already added to favorites!')
			)
		);
	}

	removeFromFavorites(movie) {
		let context = this;

		axios.post('/favorite', {
			movie: movie
		})
		.then(() =>
			axios.get('/favorite')
			.then((data) =>
				context.setState({
					favorites: data.data
				})
			)
		).catch((err) =>
			reject(err)
		);
	}

	render() {
		return (
			<div>
				<form>
					Enter a keyword:<br/>
					<input type="text" onChange={this.change}></input>
				</form>
				<table id="movies" align="left">
					<tbody>
						<tr>
							<td>
								<button
									onClick={() => {
										this.search(this.state.query);
									}}
								>Search</button>
								<h2>Movies:</h2>
							</td>
						</tr>
						<tr>
							<td>
								<MovieList
									id="movies"
									movies={this.state.movies}
									addToFavorites={this.addToFavorites.bind(this)}
								/>								
							</td>
						</tr>
					</tbody>
				</table>
				<table id="favs" align="right">
					<tbody>
						<tr>
							<td>
								<h2>Favorites:</h2>
							</td>
						</tr>
						<tr>
							<td>
								<FavoriteList
									favorites={this.state.favorites}
									removeFromFavorites={this.removeFromFavorites.bind(this)}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;