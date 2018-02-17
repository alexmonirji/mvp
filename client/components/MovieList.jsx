import React from 'react';
import Movie from './Movie.jsx';

class MovieList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{
					this.props.movies.map((movie) => 
						<Movie
							movie={movie}
							addToFavorites={this.props.addToFavorites}
							key={movie.id}
						/>
					)
				}
			</div>
		);
	}
}

export default MovieList;