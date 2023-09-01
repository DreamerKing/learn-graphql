import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export interface MyContext {
  token?: string;
  prisma: PrismaClient;
  books: any[];
}

export const context = async ({ req }: any) => ({
  token: req.headers.token,
  prisma: client,
  books,
});
