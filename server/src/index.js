// in src/index.js
import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import DataLoader from 'dataloader';
import bodyParser from 'body-parser';

const MongoClient = require('mongodb').MongoClient;
const { Client } = require('pg');

import schema from './schema';

import { dataloaders as userDataloaders } from './user/resolvers';
import { dataloaders as statDataloaders } from './stat/resolvers';

const start = async () => {
    // const pgClient = new Client('postgres://postgres:postgres@45.32.125.3:5432/mytweeter');
    const pgClient = new Client('postgres://rxtahmzp:YS9v35I60ZW8GH0QCSLkeKdv9tGwrC69@stampy.db.elephantsql.com:5432/rxtahmzp');
    await pgClient.connect();
    const testpg = await pgClient.query('SELECT * from users WHERE id = $1', ['abcxyz']).then(res => res.rows);

    const mongoClient = await MongoClient.connect('mongodb://nguyenviethoa:Taptrung9@ds237989.mlab.com:37989/mytweeter');
    const db = mongoClient.db("mytweeter");
    const test = await mongoClient.db("mytweeter").collection('stats').find({ 'tweet_id':{$in: [1]} }).project({ _id: 0, views: 1, likes: 1, retweets: 1, responses: 1, tweet_id: 1 }).toArray(); 

    var app = express();

    app.use(cors());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(bodyParser.json())
    app.use(
        '/graphql',
        graphqlHTTP(request => 
            {   
                const startTime = Date.now();
                return{
                    schema: schema,
                    context: { pgClient, db, author_id: "abcxyz", dataloaders: { ...userDataloaders(pgClient), ...statDataloaders(db) }},
                    graphiql: true,
                    extensions: ({
                        document, variables, operationName, result
                        }) => 
                    ({
                        timing: Date.now() -startTime,
                    }),
                    debug: true
            };
        }),
    );
    app.listen(4000);
    // console.log('Running a GraphQL API server at http://localhost:4000/graphql');

}

start();