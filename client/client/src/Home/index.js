import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';

export class Home extends Component {

	constructor(props) {
		super(props);
	}


	render() {
	
		return (
		<div>	
			<ul className="container">
				Home Page
			</ul>	
			<i className="material-icons">add</i>
			<Link to='/tweets'> go to tweets list </Link>
			<Link to='/tweets/new'> create new tweet </Link>
		</div>
		);
	}
}
