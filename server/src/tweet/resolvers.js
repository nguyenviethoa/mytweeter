export const Query = {
    // Tweets: (_, { limit = 5, skip = 0 }, context) =>
    //     Promise.resolve(
    //         context.datastore.tweets
    //             .slice()
    //             .sort((a, b) => b.date - a.date)
    //             .slice(skip, skip + limit)
    //     ),
    // Tweet: (_, { id }, context) =>
    //     Promise.resolve(context.datastore.tweets.find(tweet => tweet.id == id)),
    Tweets: (_, __, context) => context.pgClient
        .query('SELECT * from tweets')
        .then(res => res.rows),
    Tweet: (_, { id }, context) => context.pgClient
        .query('SELECT * from tweets WHERE id = $1', [id])
        .then(res => res.rows),
};
export const Mutation = {
    createTweet: (_, { body }, context) => {
        const nextTweetId =
            context.datastore.tweets.reduce((id, tweet) => {
                return Math.max(id, tweet.id);
            }, -1) + 1;
        const newTweetStats = {
            tweet_id: nextTweetId,
            views: 0,
            likes: 0,
            retweets: 0,
            responses: 0,
        };
        const newTweet = {
            id: nextTweetId,
            date: new Date(),
            author_id: context.author_id,
            body,
            Stats: newTweetStats,
        };

        context.datastore.tweets.push(newTweet);
        context.datastore.stats.push(newTweetStats);
        return Promise.resolve(newTweet);
    },
};
export const Tweet = {
    // Author: (tweet, _, context) =>
    //     context.dataloaders.userById.load(tweet.author_id),
    // Stats: (tweet, _, context) =>
    //     context.dataloaders.statForTweet.load(tweet.id),
    Author: (tweet, _, context) => context.pgClient
        .query('SELECT * from users WHERE id = $1', [tweet.author_id])
        .then(res => res.rows),
    Stats: (tweet, _, context) => {
        console.log('tweetid', tweet);
        return 
        context.db
        .collection('stats')
        .find({ 'tweet_id': tweet.id })
        // .query('SELECT * from stats WHERE tweet_id = $1', [tweet.id])
        .toArray()
    }
};
