const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const PORT = 8888;
const schema = buildSchema(`
    type Account {
        name: String, 
        salary(city: String): Int
    }
    type Query {
    getClassMates(classNo: Int!):[String],
    account(uName: String): Account
}
`);

const root = { 
    getClassMates({ classNo }) {
        const obj = {
            31: ["Wang"]
        }
        return obj[classNo]
    },
    account({ uName }) {
        return {
          name: "King",
          salary({ city }) {
              console.log("city", city);
             return  city == "N" ? 1200: 200;
            }
        }
    }
};

const app = express();

app.use('/graphql', graphqlHTTP({ 
    schema,
    rootValue: root,
    graphiql: true
}));

app.use(express.static('public'));
app.listen(PORT, ()=> console.log(`Server is running at ${PORT}`));