import Base from '../base';
import Tweet from '../tweet/schema';

const User = `
extend type Query {
    User(id: ID!): User,
}
type User {
    _id: ID!
    username: String
    first_name: String
    last_name: String
    full_name: String
    avatar_url: String
    tweets: [Tweet]
}
`;

export default () => [User, Base];
