import React from 'react';

class Favorite extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div onClick={() =>
				this.props.removeFromFavorites(this.props.favorite)
			}>
				<h4>{this.props.favorite.title}</h4>
				<img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${this.props.favorite.poster_path}`}/>
			</div>
		);
	}
}

export default Favorite;