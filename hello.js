const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require("graphql");
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

/* const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = { hello: () => "Hello world!" };

const app = express();
app.use('graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
})); */

const typeDefs = gql`
    type Query {
        hello: String
    }

    schema {
        query: Query
    }
    `;

const resolvers = {
    Query: {
        hello(root){
            return "world";
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

app.listen({ port: 5000 },  ()=> console.log(`Now server to ${app.port}`));

/* graphql(schema, '{hello}', root).then((response) => {
    console.log(response);
}); */