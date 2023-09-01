import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

import resolvers from "./resolvers";
import { context, MyContext } from "./context";

const __dirname = dirname(fileURLToPath(import.meta.url));

const typeDefs = readFileSync(join(__dirname, "./schema.graphql"), {
  encoding: "utf8",
});

const server = new ApolloServer<MyContext>({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
  }),
  // typeDefs,
  // resolvers,
});

const { url } = await startStandaloneServer(server, {
  context,
  listen: { port: 4000 },
});

console.log(`server started at: ${url}`);
