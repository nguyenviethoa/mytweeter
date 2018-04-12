import gql from 'graphql-tag';

export const TweetsQuery = gql`
	query getTweets{
		Tweets{
			body
			Stats{
				views
			}
			Author{
				username
			}
		}
	}
`;
