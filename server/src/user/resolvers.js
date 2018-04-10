import DataLoader from 'dataloader';

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

// export const getUsersById = pgClient => ids => pgClient
//         .query(`SELECT * from users WHERE id = ANY($1::int[])`, [ids])
//         .then(res => res.rows);
// export const dataloaders = pgClient => ({
//     userById: new DataLoader(getUsersById(pgClient)),
// })

export const dataloaders = (pgClient) => ({
    userById: new DataLoader(
        ids => batchUsers(pgClient, ids),
        {cacheKeyFn: key => key.toString()} // normalize the format of the id field
    ),
});
