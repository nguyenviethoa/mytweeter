import DataLoader from 'dataloader';
import bcrypt from 'bcrypt';
import UserModel from './UserModel';
import TweetModel from '../tweet/TweetModel';
import { Tweet } from '../tweet/resolvers';

export const Query = {
    User: async (_, { id }) => {
        const user = await UserModel.findOne({ _id: id })
        .populate('tweets');

        return user;
    },
    UserByEmail: async (_, { email }) => {
        const user = await UserModel.findOne({ email })
        .populate('tweets');

        return user;
    },
};
export const User = {
    full_name: (author) => `${author.first_name} ${author.last_name}`
};

async function batchUsers (ids) {
    const users = await UserModel.find({ _id: { $in: ids }});
    return users;
}

export const dataloaders = () => ({
    userById: new DataLoader(
        ids => batchUsers(ids),
        {cacheKeyFn: key => key.toString()} // normalize the format of the id field
    ),
});

export const Mutation = {
    loginWithEmail: async (_, { email, password }) => {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error('Email not existed');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Password is incorrect');
        }

        return user;
    },
    signup: async(_, { username, email, password }) => {
        const usersEmail = await UserModel.find({ email: email });
        const usernames = await UserModel.find({ username: username });
        console.log('userEmail', usersEmail);
        const isNotUndefined = usersEmail && usernames;
        const isEmptyAccounts = usersEmail.length === 0 || usernames.length === 0;
        if (isNotUndefined && !isEmptyAccounts) {
            throw new Error('Email or username already existed');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('hashed pass: ', hashedPassword);
        const newUser = new UserModel({ username, email, password: hashedPassword });
        const savedUser = newUser.save().then((user) => user);
        return savedUser; 
    },
};

/** 
 * with sql queries
export const Query = {
    User: (_, { id }, context) => context.pgClient
        .query('SELECT * from users WHERE id = $1', [id])
        .then(res => res.rows),
};
export const User = {
    full_name: (author) => `${author.first_name} ${author.last_name}`
};

async function batchUsers (pgClient, ids) {
    return await pgClient
    .query(`SELECT * from users WHERE id = ANY($1::text[])`, [ids])
    .then(res => res.rows);
}

export const dataloaders = (pgClient) => ({
    userById: new DataLoader(
        ids => batchUsers(pgClient, ids),
        {cacheKeyFn: key => key.toString()} // normalize the format of the id field
    ),
});

*/