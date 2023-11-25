import { PrismaClient } from "@prisma/client";
import { IncomingMessage, ServerResponse } from "http";

const client = new PrismaClient();

export interface MyContext {
  token?: string;
  prisma: PrismaClient;
}

export const context = async ({ req, res }: {req: IncomingMessage, res: ServerResponse }) => {
  const token = req.headers.authorization || '';
    // console.log(token, 'token context');
  return {
    token,
    prisma: client,
  }
};
