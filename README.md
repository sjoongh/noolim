# noolim-node

## Node.js는 webpack 대신 koa를 활용했다는 점이 주요 특징이다.

**package.json**
```
{
  "name": "noolim-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "@koa/cors": "^3.1.0",
    "connect-history-api-fallback": "^1.6.0",
    "dotenv": "^10.0.0",
    "knex": "^0.95.11",
    "koa": "^2.13.3",
    "koa-body": "^4.2.0",
    "koa-generator": "^1.1.17",
    "koa-router": "^10.1.1",
    "mysql": "^2.18.1",
    "nodemon": "^2.0.13"
  },
  "devDependencies": {},
  "scripts": {
    "start": "nodemon --watch src/ src",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
