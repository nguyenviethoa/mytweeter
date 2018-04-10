const Stat = `
type Stat {
    _id: String
    views: Int
    likes: Int
    retweets: Int
    responses: Int
    tweet_id: Int
}
`;

export default () => [Stat];
