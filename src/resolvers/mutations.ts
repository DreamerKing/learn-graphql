import { MutationResolvers, LoginInput, LoginResponse } from "../generated/resolvers-types";
import {createToken} from '../utils/jwt';
const mutations: MutationResolvers = {
  Mutation: {
    async addUser(parent: any, { user }: any, { prisma }: any) {
      return await prisma.user.create({
        data: { ...user },
      });
    },
    async login(parent: any, { loginParam }: {loginParam: LoginInput}, { prisma }: any): Promise<LoginResponse> {
      console.log("login:", loginParam)
      const user = await prisma.user.findFirst({
        where: {
          name: loginParam.name,
          password: loginParam.password
        },
        select: {
          id: true,
          name: true
        }
      })
      console.log('user:', user)
      if (user) {
        const token = await createToken(user);
        console.log('token:', token)
        return { token, code: 0 }
      } else {
        return { code: -1, message: '用户名或密码错误!' };
      }
    }
  },
};

export default mutations;
