const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');

const serialize = value => new Date(value).toISOString();
const parseValue = value => new Date(value);
const parseLiteral = ast => ast.value;
const typeDefs =gql `
    scalar DateTime
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String,
        category: PhotoCategory!
        created: DateTime
        postedBy: User!
        taggedUsers: [User!]!
    }
    type User {
        id: ID!
        url: String!
        name: String!
        avtar: String!
        postedPhotos: [Photo!]!
        inPhotos: [Photo!]!
    }
    input PostPhotoInput {
        name: String!
        category: PhotoCategory=PORTRAIT
        description: String
    }
    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSPACE
        GRAPHIC
    }
    type Query {
        totalPhotos: Int!
        allPhotos(after: DateTime): [Photo!]!
    }
    type Mutation {
        postPhoto(input: PostPhotoInput! ) : Photo!
    }  
`;

const photos = [
    { "id": "1", name: "Dropping the heart", description: "jjdd", category: "ACTION", githubUser: "king", created: "10-12-2019"},
    { "id": "2", name: "Dropping  3the heart", description: "jjdd", category: "ACTION", githubUser: "king2",created: "9-10-2019"}
];
const users = [
    {
        githubUser: "king",
        name: "dreamer"
    },
    {
        githubUser: "king2",
        name: "dreamer2"
    }
];

const tags = [
    {
        photoID: '1',
        userID: "king"
    },
    {
        photoID: '1',
        userID: "king2"
    }
]
let _id = 0;
const resolvers = {
    Query: {
       totalPhotos: () => photos.length,
       allPhotos: (parent, args) => {
         console.log(args.after);
         return photos;
        //   return photos.filter(p => new Date(p.created) > new Date(args.after));
       }
    },
    Mutation: {
        postPhoto(parent, args) {
            let newPhoto = {
                id: _id++,
                ...args.input,
                created: new Date()
            }
            photos.push(newPhoto);
            return newPhoto;
        }
    },
    Photo: {
        url: parent => `http://localhost/img/${parent.id}.jpg`,
        postedBy: parent => {
            return users.find(u => u.githubUser == parent.githubUser)
        },
        taggedUsers: parent => tags.filter(t => t.photoID == parent.id).map(t => t.userID).map(uid => users.find(u => u.githubUser == uid))
    },
    User: {
        postedPhotos: parent => {
            return photos.filter(p => p.githubUser == parent.githubUser)
        },
        inPhotos: parent => tags.filter(t => t.userID == parent.id).map( t => t.photoID).map(pid => photos.find( p => p.id == pid))
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: "A valid data time value.",
        parseValue: value => new Date(value),
        serialize: value => new Date(value).toISOString(),
        parseLiteral: ast => ast.value
    })
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => console.log(`GraphQL service is running on ${url}`));