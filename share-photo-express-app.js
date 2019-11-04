
const { ApolloServer, gql } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const express = require("express");
const { MongoClient } = require('mongodb');
const expressPlayground = require('graphql-playground-middleware-express').default;
require('dotenv').config();
const { readFileSync } = require('fs');
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');
const resolvers = require('./resolvers');

async function start() {
    const app = express();
    const MONGO_DB = process.env.DB_HOST;
    const client = await MongoClient.connect(
        MONGO_DB,
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }
    );

    const db = client.db();
    db.collection("photos").find({}).toArray((err, docs) => {
        console.log("docs:", docs);
    }) 

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            const githubToken = req.headers.authorization;
            console.log("githubToken:", githubToken);
            const currentUser = await db.collection('users').findOne({ githubToken });
            console.log("current:", currentUser);
            
            return { db, currentUser }
        }
    });

    server.applyMiddleware({ app });
    app.get('/', (req, res) => res.end("Welcome to the photoshare api"));
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
    app.listen({ port: 4000}, () => console.log(`GraphQL service is running on http://localhost:4000/${server.graphqlPath}` ));
}

try {
    start(); 
} catch (error) {
   console.log(error); 
}
