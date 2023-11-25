import { QueryResolvers } from "../generated/resolvers-types";
import { MyContext } from "../context";

const queries: QueryResolvers = {
  Query: {
    async users(parent: any, args: any, { prisma, token }: MyContext) {
      console.log('token:', token )
      return await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          password: false
        }
      });
    },
  },
};

export default queries;
