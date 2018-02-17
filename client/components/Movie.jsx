import React from 'react';

class Movie extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div onClick={() =>
				this.props.addToFavorites(this.props.movie)
			}>
				<h4>{this.props.movie.title}</h4>
				<img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${this.props.movie.poster_path}`}/>
				<h5>Vote Average: {this.props.movie.vote_average}</h5>
			</div>
		);
	}
}

export default Movie;