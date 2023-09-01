const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const app = express();
app.use(cors({
    origin: 'http://localhost:5000',
    method: "GET,POST"
}))
app.use('/graphql', graphqlHTTP({ 
    schema,
    graphql: true
}));

app.listen(5000, () => {
    console.log("server at localhost:50000");
});


