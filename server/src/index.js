// in src/index.js
import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import DataLoader from 'dataloader';

const MongoClient = require('mongodb').MongoClient;
const { Client } = require('pg');

import schema from './schema';
// import context from './context';

// var app = express();

// app.use(cors());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.use(
//     '/graphql',
//     graphqlHTTP(request => ({
//         schema: schema,
//         context: context(request),
//         graphiql: true,
//     })),
// );
// app.listen(4000);
// console.log('Running a GraphQL API server at http://localhost:4000/graphql');

const start = async () => {
    const pgClient = new Client('postgres://postgres:postgres@localhost:5432/mytweeter');
    await pgClient.connect();
    const testpg = await pgClient.query('SELECT * from users WHERE id = $1', [1]);
    console.log('testpg', testpg)

    const mongoClient = await MongoClient.connect('mongodb://nguyenviethoa:Taptrung9@ds237989.mlab.com:37989/mytweeter');
    const db = mongoClient.db("mytweeter");
    const test = await mongoClient.db("mytweeter").collection('stats').find({ 'tweet_id': 1 }).toArray(); 
    console.log('test', test);

    const getUsersById = pgClient => ids => pgClient
        .query(`SELECT * from users WHERE id = ANY($1::int[])`, [ids])
        .then(res => res.rows);
    console.log('getUserById', getUsersById);
    const dataloaders = pgClient => ({
        userById: new DataLoader(getUsersById(pgClient)),
    })

    var app = express();

    // app.use(cors());

    // app.use(function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    // });

    app.use(
        '/graphql',
        graphqlHTTP(request => ({
            schema: schema,
            context: { pgClient, db, dataloaders: dataloaders(pgClient) },
            graphiql: true,
        })),
    );
    app.listen(4000);
    console.log('Running a GraphQL API server at http://localhost:4000/graphql');

}

start();