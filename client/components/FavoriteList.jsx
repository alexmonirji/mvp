import React from 'react';
import Favorite from './Favorite.jsx';

class FavoriteList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{
					this.props.favorites.map((favorite) =>
						<Favorite
							favorite={favorite}
							removeFromFavorites={this.props.removeFromFavorites}
							key={favorite._id}
						/>
					)
				}
			</div>
		);
	}
}

export default FavoriteList;