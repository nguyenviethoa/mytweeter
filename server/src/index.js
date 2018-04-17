// in src/index.js
import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import DataLoader from 'dataloader';
import bodyParser from 'body-parser';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import expressWinston from 'express-winston';
import winston from 'winston';
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const { Client } = require('pg');


import schema from './schema';

// import keys from '../config/keys';

import { dataloaders as userDataloaders } from './user/resolvers';
import { dataloaders as statDataloaders } from './stat/resolvers';

const start = async () => {

    // const pgClient = new Client('postgres://postgres:postgres@45.32.125.3:5432/mytweeter');
    // const pgClient = new Client('postgres://rxtahmzp:YS9v35I60ZW8GH0QCSLkeKdv9tGwrC69@stampy.db.elephantsql.com:5432/rxtahmzp');
    // await pgClient.connect();

    // const mongoClient = await MongoClient.connect('mongodb://nguyenviethoa:Taptrung9@ds237989.mlab.com:37989/mytweeter');
    // const db = mongoClient.db("mytweeter");

    mongoose.Promise = global.Promise;

    mongoose.connect('mongodb://nguyenviethoa:Taptrung9@ds237989.mlab.com:37989/mytweeter');
    mongoose.connection
    .once('open', () => { 
        console.log('start server');
        var app = express();
        // google login
        // passport.use(
        //     new GoogleStrategy({
        //         clientID: keys.googleClientID,
        //         clientSecret: keys.googleClientSecret,
        //         callbackURL: '/auth/google/callback'
        //     }, (accessToken, refreshToken, profile, done) => {
        //         console.log(accessToken);
        //         console.log(refreshToken);
        //         console.log(profile);
        //     })
            
        // );
    
        // app.get(
        //     '/auth/google',
        //     passport.authenticate('google',{
        //         scope: ['profile', 'email']
        //     })
        // )
    
        // app.get(
        //     '/auth/google/callback', passport.authenticate('google')
        // );
    
        // app.use(cors());
    
        // app.use(function (req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     next();
        // });

        const { collections } = mongoose.connection;
        
        app.use(bodyParser.json())

        // app.use(express.methodOverride());

        // app.use(expressWinston.logger({
        //     transports: [
        //         new winston.transports.Console({
        //             json: true,
        //             colorize: true
        //         })
        //     ]
        // }));

        // app.use(expressWinston.errorLogger({
        //     transports: [
        //         new winston.transports.Console({
        //             json: true,
        //             colorize: true
        //         })
        //     ]
        // }));

        function loggingMiddleware(req, res, next) {
            if (req.url.indexOf('graphql') !== -1) {
                winston.debug('REQUEST: ', req.body);
            }
            next();
        }
        app.use(loggingMiddleware);
    
        app.use(
            '/graphql',
            graphqlHTTP(request => 
                {   
                    console.log('request come', request);
                    const startTime = Date.now();
                    return{
                        schema: schema,
                        context: { dataloaders: { ...userDataloaders(), ...statDataloaders() }},
                        graphiql: true,
                        formatError: error => {
                            const params = {
                                message: error.message,
                                locations: error.locations,
                                stack: error.stack
                            };
                            winston.error(`message: "${error.message}", query: "${request.body.query}`);
                            return (params);        
                        },
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
        console.log('Running a GraphQL API server at http://localhost:4000/graphql'); 
    })
    .on('error', (error) => {
        console.warn('Warning', error);
    });
}

start();