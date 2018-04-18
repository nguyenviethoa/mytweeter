// import 'normalize.css/normalize.css';
import './style/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Switch, Route, BrowserRouter as Router, Link, HashRouter } from 'react-router-dom';
import TweetList from './TweetList';
import { Home } from './Home';
import { CreateTweet } from './TweetList/CreateTweet';
import { TweetDetail } from './TweetList/TweetDetail';

const client = new ApolloClient({
	// By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink({uri: 'http://localhost:4000/graphql'}),
  cache: new InMemoryCache({
		dataIdFromObject : object => `${object.__typename}__${object.id || object.tweet_id}`
	})
});

const Root = () => {
  return (
  		<ApolloProvider client={client}>
				<div>
				<HashRouter>
					<Switch>
						<Route exact path='/' component={Home} />
						<Switch>
							<Route exact path='/tweets' component={TweetList} />
							<Route path='/tweets/new' component={CreateTweet} />
							<Route path='/tweets/:id' component={TweetDetail} />
						</Switch>	
					</Switch>
					
				</HashRouter>
				</div>
  		</ApolloProvider>
  	);
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);

