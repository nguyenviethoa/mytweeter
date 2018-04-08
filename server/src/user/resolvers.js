import DataLoader from 'dataloader';

export const Query = {
    // User: (_, __, context) =>
    //     Promise.resolve(context.datastore.users.find(user => user.id === context.author_id)),
    User: (_, { id }, context) => context.pgClient
        .query('SELECT * from users WHERE id = $1', [id])
        .then(res => res.rows),
};
export const User = {
    // full_name: author =>
    //     Promise.resolve(`${author.first_name} ${author.last_name}`),
    full_name: (author) => `${author.first_name} ${author.last_name}`
};
export const getUsersById = datastore => ids =>
    Promise.resolve(
        ids.map(id => datastore.users.find(user => user.id == id)),
        datastore.users.filter(user => ids.includes(user.id)),
    );
export const dataloaders = datastore => ({
    userById: new DataLoader(getUsersById(datastore)),
});
