const { GraphQLScalarType } = require("graphql");
require('es6-promise').polyfill();
require('isomorphic-fetch');

const photos = [
  {
    id: "1",
    name: "Dropping the heart",
    description: "jjdd",
    category: "ACTION",
    githubUser: "king",
    created: "10-12-2019"
  },
  {
    id: "2",
    name: "Dropping  3the heart",
    description: "jjdd",
    category: "ACTION",
    githubUser: "king2",
    created: "9-10-2019"
  }
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
    photoID: "1",
    userID: "king"
  },
  {
    photoID: "1",
    userID: "king2"
  }
];

const requestGithubToken = credentials => 
  fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(credentials)
  })
    .then(res => res.json());

const requestGithubUserAccount = token =>
  fetch(`https://api.github.com/user?access_token=${token}`)
    .then(res => res.json());

const authorizeWithGithub = async credentials => {
    console.log("credentials:", credentials);   
  const { access_token } = await requestGithubToken(credentials);
  console.log("access_token:", access_token);
  
  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
}

let _id = 0;
const resolvers = {
  Query: {
    totalPhotos: (parent, args, { db }) =>
      db.collection("photos").estimatedDocumentCount(),
    allPhotos: (parent, args, { db }) =>
      db
        .collection("photos")
        .find()
        .toArray(),
    totalUsers: (parent, args, { db }) =>
      db.collection("users").estimatedDocumentCount(),
    allUsers: (parent, args, { db }) =>
      db
        .collection("users")
        .find()
        .toArray(),
    me: (parent, args, { currentUser }) => currentUser
  },
  Mutation: {
    async addFakeUsers(root, { count }, { db }){
        let randomUserApi = `https://randomuser.me/api/?results=${count}`;
        let { results } = await fetch(randomUserApi)
            .then(res => res.json());
        let users = results.map(r => ({
            githubLogin: r.login.username,
            name: `${r.name.first} ${r.name.last}`,
            avatar: r.picture.thumbnail,
            githubToken: r.login.sha1
         }));
         console.log("results ->:", results);
         
         await db.collection('users').insert(users);
         return users;
    },
    async fakeUserAuth(parent, { githubLogin }, { db }) {
        let user = await db.collection('users').findOne({ githubLogin });
        if(!user) {
            throw new Error(`Cannot find user with githubLogin "${githubLogin}"`);
        }
        return { 
            token: user.githubToken,
            user
        };
    },
    async postPhoto(parent, args, { db, currentUser}) {
        if(!currentUser){
            throw new Error('only an authorized user can post a photo');
        }
      let newPhoto = {
        id: _id++,
        ...args.input,
        userID: currentUser.githubLogin,
        created: new Date()
      };
      const { insertedIds } = await db.collection('photos')
        .insert(newPhoto);
        newPhoto.id = insertedIds[0];
    //   photos.push(newPhoto);
      return newPhoto;
    },
    async githubAuth(parent, { code }, { db }) {
      let {
        message,
        access_token,
        avatar_url,
        login,
        name
      } = await authorizeWithGithub({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code
      });
      
      if (message) {
        throw new Error(message);
      }

      let latestUserInfo = {
        name,
        githubLogin: login,
        githubToken: access_token,
        avatar: avatar_url
      };

      const {
        ops: [user]
      } = await db
        .collection("users")
        .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });
       // console.log(user, access_token, ">>>", latestUserInfo);
        
      return { user, token: access_token };
    }
  },
  Photo: {
    id: parent => parent.id || parent._id,
    url: parent => `/img/photos/${parent.id}.jpg`,
    postedBy: (parent, args, { db }) => {
        return db.collection('users').findOne({ githubLogin: parent.userID })
    //   return users.find(u => u.githubUser == parent.githubUser);
    },
    taggedUsers: parent =>
      tags
        .filter(t => t.photoID == parent.id)
        .map(t => t.userID)
        .map(uid => users.find(u => u.githubUser == uid))
  },
  User: {
    postedPhotos: parent => {
      return photos.filter(p => p.githubUser == parent.githubUser);
    },
    inPhotos: parent =>
      tags
        .filter(t => t.userID == parent.id)
        .map(t => t.photoID)
        .map(pid => photos.find(p => p.id == pid))
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid data time value.",
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value
  })
};

/* async function githubAuth(parent, { code }, { db }) {
    let {
        message,
        access_token,
        avatar_url,
        login,
        name
    } = await authorizeWithGithub({
        client_id: "cbb0d4f8112f91373ca5",
        client_secrect: "5ea37bd3dbe2557a2a9c8c7e05fdfb8ed2c2fca0",
        code
    });
    if(message) {
        throw new Error(message);
    }

    let latestUserInfo = {
        name,
        githubLogin: login,
        githubToken: access_token,
        avatar: avatar_url
    };

    const { ops: [ user ]} = await db.collection('users').replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true});
    return { user, token: access_token };
} */

module.exports = resolvers;
