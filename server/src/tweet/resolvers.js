const uuidv1 = require('uuid/v1');
import TweetModel from './TweetModel';
import UserModel from '../user/UserModel';

export const Query = {
    Tweets: async (_, __, context) => {
        const tweets = await TweetModel.find({});
        return tweets;
    },
    Tweet: async (_, { id }, context) => {
        const tweet = await TweetModel.findOne({ _id: id });
        return tweet;
    },
};
export const Mutation = {
    createTweet: async (_, { body, username }, context) => {
        const user = await UserModel.findOne({ username });
        const newTweet = new TweetModel({ body, author: user, date: new Date()});
        newTweet.save();
        return newTweet;
    },
};
export const Tweet = {
    Author: async (tweet, _, context) => {
        console.log('tweet', tweet);
        const result = await context.dataloaders.userById.load(tweet.author);
        return result;
    },
    Stats: async (tweet, _, context) => {
        const result = await context.dataloaders.statForTweet.load(tweet.stats);
        if (!result) return {};
        return result;
    }
};

/**
 * 
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
        .query('SELECT * from tweet')
        .then(res => res.rows),
    Tweet: (_, { id }, context) => context.pgClient
        .query('SELECT * from tweets WHERE id = $1', [id])
        .then(res => res.rows),
};
export const Mutation = {
    createTweet: async (_, { body }, context) => {
        // const nextTweetId =
        //     context.datastore.tweets.reduce((id, tweet) => {
        //         return Math.max(id, tweet.id);
        //     }, -1) + 1;

        const nextTweetId = uuidv1();
        console.log('generated id', nextTweetId);
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
        };

        const result = await context.pgClient.query('insert into tweets (id, body, date, author_id) values ($1, $2, $3, $4)',
        [newTweet.id, newTweet.body, newTweet.date, newTweet.author_id]);

        await context.db.collection('stats').insert(newTweetStats);
        // context.datastore.tweets.push(newTweet);
        // context.datastore.stats.push(newTweetStats);
        return newTweet;
    },
};
export const Tweet = {
    Author: async (tweet, _, context) => {
        const result = await context.dataloaders.userById.load(tweet.author_id);
        return result;
    },
    Stats: async (tweet, _, context) => {
        const result = await context.dataloaders.statForTweet.load(tweet.id);
        return result;
    }
};

 */
