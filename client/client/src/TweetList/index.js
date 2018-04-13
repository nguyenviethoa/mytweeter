import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { TweetsQuery } from './queries';
import { DeleteSongMutation } from './mutations';

// @graphql(TweetsQuery, { name: "TweetsQuery" })
class TweetList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	onDeletePressed(id) {
	}

	renderSongs() {
		// return this.props.SongsQuery.songs.map( (song) => {
		// 	return (
		// 		<li 
		// 			key={song.id} 
		// 			className="collection-item"
		// 			onClick={() => {}}
		// 		>
		// 			{song.title}

		// 			<Link to={`/songs/${song.id}`}>{song.title}</Link>

		// 			<i
		// 				className="material-icons"
		// 				onClick={() => this.onDeletePressed(song.id)}
		// 			>
		// 				delete
		// 			</i>	
		// 		</li>	
		// 	);
		// });
	}

	render() {
		const { loading } = this.props.TweetsQuery;
		if (loading) {
			return <div> Loading... </div>
		}

		console.log(this.props);
	
		return (
			<div className="header">
				<label> list of tweets here </label>
				{/* <ul className="collection">
					{this.renderSongs()}
				</ul>
				<Link
					to="/songs/new"
					className="btn-floating btn-large red right"
				>
					<i className="material-icons">add</i>
				</Link>	 */}
				<i className="material-icons">add</i>
			</div>	
		);
	}
}

export default graphql(TweetsQuery, {name: "TweetsQuery"})(TweetList)
