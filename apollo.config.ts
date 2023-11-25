export default {
  client: {
    service: {
      name: "king",
      url: "http://localhost:4000/graphql",
    },
    includes: ["src/**/*.ts"],
    tagName: "gql",
  },
  service: {
    name: "king",
    localSchemaFile: "src/schema.graphql",
    endpoint: {
      url: "http://localhost:4000/graphql",
      headers: {
        authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    },
  },
};
