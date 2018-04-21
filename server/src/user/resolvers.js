import DataLoader from 'dataloader';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from './UserModel';
import TweetModel from '../tweet/TweetModel';
import { Tweet } from '../tweet/resolvers';
import JWT_SECRET from '../../config/config';

export const Query = {
    User: async (_, { id }) => {
        const user = await UserModel.findOne({ _id: id })
        .populate('tweets');

        return user;
    },
    UserByEmail: async (_, { email }) => {
        const user = await UserModel.findOne({ email: email })
        .populate('tweets');

        return user;
    },
};

export const User = {
    full_name: (author) => `${author.first_name} ${author.last_name}`
};

async function batchUsers (ids) {
    const promisses = await UserModel.find({ _id: { $in: ids }});
    console.log('promisses', promisses)
    return Promise.all(promisses);
}

export const dataloaders = () => ({
    userById: new DataLoader(
        ids => batchUsers(ids),
        {cacheKeyFn: key => key.toString()} // normalize the format of the id field
    ),
});

export const Mutation = {
    loginWithEmail: async (_, { email, password }, ctx) => {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            throw new Error('Email not existed');
        }

        const validPassword = await bcrypt.compare(password, user.password)
        .then((res) => {
            if (res) {
              // create jwt
              const token = jwt.sign({
                id: user.id,
                email: user.email,
              }, JWT_SECRET);
              user.jwt = token;
              ctx.user = Promise.resolve(user);
              return user;
            }

            return Promise.reject('password incorrect');
        });

        return user;
    },
    signup: async(_, { username, email, password }, ctx) => {
        // find user by email
        return UserModel.findOne({ email } ).then((existing) => {
            if (!existing) {
                // hash password and create user
                return bcrypt.hash(password, 10).then(hash => new UserModel({
                    email,
                    password: hash,
                    username: username || email,
                })).then((user) => {
                    const { _id } = user;
                    const token = jwt.sign({ _id, email }, JWT_SECRET);
                    user.jwt = token;
                    ctx.user = Promise.resolve(user);
                    return user;
                });
            }

            return Promise.reject('email already exists'); // email already exists
        });
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