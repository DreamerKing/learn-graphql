import { MutationResolvers } from "../generated/resolvers-types";

const mutations: MutationResolvers = {
  Mutation: {
    async addUser(parent: any, { user }: any, { prisma }: any) {
      return await prisma.user.create({
        data: { ...user },
      });
    },
  },
};

export default mutations;
