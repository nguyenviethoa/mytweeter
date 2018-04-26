import DataLoader from 'dataloader';
import StatModel from './StatModel';
// export const getStatsForTweet = datastore => ids =>
//     Promise.resolve(
//         ids.map(id => datastore.stats.find(stat => stat.tweet_id == id)),
//     );
// export const dataloaders = datastore => ({
//     statForTweet: new DataLoader(getStatsForTweet(datastore)),
// });

async function batchStats (ids) {
    return await StatModel.find({ _id: { $in: ids } });
}

export const getStatsForTweet = db => ids => db
    .collection('stats')
    .find({ 'tweet_id': {$in: ids} })
    // .project({ _id: 0, views: 1, likes: 1, retweets: 1, responses: 1, tweet_id: 1 })
    .toArray();

export const dataloaders = () => ({
    statForTweet: new DataLoader(
        ids => batchStats(ids),
        {cacheKeyFn: key => key.toString()} // normalize the format of the id field
    ),
});

/**
 * 
 
async function batchStats (db, ids) {
    return await db
    .collection('stats')
    .find({ 'tweet_id': {$in: ids} })
    // .project({ _id: 0, views: 1, likes: 1, retweets: 1, responses: 1, tweet_id: 1 })
    .toArray();
}

export const getStatsForTweet = db => ids => db
    .collection('stats')
    .find({ 'tweet_id': {$in: ids} })
    // .project({ _id: 0, views: 1, likes: 1, retweets: 1, responses: 1, tweet_id: 1 })
    .toArray();

export const dataloaders = (db) => ({
    statForTweet: new DataLoader(
        ids => batchStats(db, ids),
        {cacheKeyFn: key => key.toString()} // normalize the format of the id field
    ),
});

*/