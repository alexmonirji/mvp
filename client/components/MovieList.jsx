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
						<Movie movie={movie} />
					)
				}
			</div>
		);
	}
}

export default MovieList;