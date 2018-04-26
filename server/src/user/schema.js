import Base from '../base';
import Tweet from '../tweet/schema';

const User = `
extend type Query {
    User(id: ID!): User,
    UserByEmail(email: String): User
}
extend type Mutation {
    loginWithEmail (email: String, password: String): User,
    signup(username: String, email: String, password: String): User
}
type User {
    _id: ID!
    email: String
    username: String
    first_name: String
    last_name: String
    full_name: String
    avatar_url: String
    tweets: [Tweet]
    password: String
    jwt: String
}
`;

export default () => [User, Base];
