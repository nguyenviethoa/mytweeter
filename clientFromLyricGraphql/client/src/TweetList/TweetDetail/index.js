import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

export class TweetDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Link to="/"> Back </Link>
                <h3> Here describe detailed Tweet </h3>
            </div>
        )
    }
}