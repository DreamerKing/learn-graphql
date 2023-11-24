# Apollo

```bash
npm pkg set type=module
```

安装依赖

```bash {.line-numbers}
npm install @apollo/server graphql
npm install --save-dev typescript @types/node
```

```json  {.line-numbers}
{
  "compilerOptions": {
    "rootDirs": ["src"],
    "outDir": "dist",
    "lib": ["es2020"],
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "types": ["node"]
  }
}
```

ApolloServer 配置选项
introspection: true 查看 Schema
