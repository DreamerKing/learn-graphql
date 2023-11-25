# Prisma

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read <https://pris.ly/d/getting-started>
2. Run yarn prisma db pull to turn your database schema into a Prisma schema.
3. Run yarn prisma generate to generate the Prisma Client. You can then start querying your database.

node 运行 esm 选项

```bash
NODE_OPTIONS=--experimental-specifier-resolution=node
```

```bash
pnpm install prisma --save-dev // 作为开发依赖安装
pnpm dlx prisma  // 查看文档
```
