import DataLoader from 'dataloader';
import UserModel from './UserModel';
import TweetModel from '../tweet/TweetModel';
import { Tweet } from '../tweet/resolvers';

export const Query = {
    User: async (_, { id }) => {
        const user = await UserModel.findOne({ _id: id })
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