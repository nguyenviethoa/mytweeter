const Stat = `
type Stat {
    _id: ID!
    views: Int
    likes: Int
    retweets: Int
    responses: Int
}
`;

export default () => [Stat];
