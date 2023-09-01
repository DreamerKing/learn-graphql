const { ApolloServer, gql }  = require('apollo-server');
const { graphql } = require("graphql");
const GraphQLJSON = require('graphql-type-json');
const { GraphQLScalarType, Kind } = require('graphql');

/* const typeDefs = `
    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]
        hello: String
    }
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
    }

    type Mutation {
       postPhoto(name: String! description: String): Photo!
    } 
`;


let _id = 0;
const photos = [];

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
        hello: () => "Hello King"
    },
    Mutation: {
        postPhoto(parent, args) {
            let newPhoto = {
                id: _id++,
                ...args
            }
            photos.push(newPhoto);
            return newPhoto;
        }

    },
    Photo: {
        url: parent => `http://test.com/img/${parent.is}.jpg`
    }
}; */

const myCustomScalarType = new GraphQLScalarType({
    name: "MyCustomScalar",
    description: "Desciption of my custom scalar type",
    serialize(value) {
        let result;
        return result;
    },
    parseValue(value) {
        let result;
        return result;
    },
    parseLiteral(ast) {
        switch(ast.kind) {
            case Kind.Int:

        }
    }
})

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }
    type Author {
        name: String
        books: [Book]
    }
    type Query {
        getBooks: [Book]
        getAuthors: [Author]
    }
    type Mutation {
        addBook(titlt: String, author: String): Book
    }
    scalar JSON

    scalar MyCustomScalar

    scalar Date

    type Foo {
        aField: JSON
    }
    type Query {
        foo: Foo
    }

    type MyDate {
        created: Date
    }

`;


const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    }
  ];

  const resolvers = {
      Query: {
          getBooks: () => books,
          getAuthors: () => {
              return books.map(({ title, author }) => ({name: author, books}))
          }
      },
      MyCustomScalar: myCustomScalarType,
      JSON: GraphQLJSON,
      Date: new GraphQLScalarType({
          name: 'Date',
          description: 'Date custom scalar type',
          parseValue(value) {
              return new Date(value);
          },
          serialize(value) {
            return value.getTime();
          },
          parseLiteral(ast) {
              if(ast.kind === Kind.Int) {
                  return parseInt(ast.value, 10);
              }
              return null;
          }
      })
  }

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => console.log(`Server is running at ${url}`));