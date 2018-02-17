import React from 'react';
import $ from 'jquery';
import MovieList from './MovieList.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			genre: '',
			movies: []
		};

		this.search = this.search.bind(this);
		this.change = this.change.bind(this);
	}

	change(e) {
		this.setState({
			genre: e.target.value
		});
	}

	search(genre) {
		$.post('/movies', {
			genre: genre
		}, (data) => {
			this.setState({
				movies: data
			});
		});
	}

	delete(movie) {
		let movies = this.state.movies;
		let index = this.state.movies.indexOf(movie);
		movies.splice(index, 0);

		this.setState({
			movies: movies
		});
	}

	render() {
		return (
			<div>
				<form>
					Enter a Genre:<br/>
					<input type="text" onChange={this.change}></input>
				</form>
				<button
					onClick={() => {
						this.search(this.state.genre);
					}}
				>Search</button>
				<MovieList movies={this.state.movies} />
			</div>
		);
	}
}

export default App;