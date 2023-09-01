import { QueryResolvers } from "../generated/resolvers-types";
import { MyContext } from "../context";

const queries: QueryResolvers = {
  Query: {
    books(root: any, args: any, { books }: MyContext) {
      return books;
    },
    async users(parent: any, args: any, { prisma }: MyContext) {
      return await prisma.user.findMany();
    },
  },
};

export default queries;
