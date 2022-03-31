const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer, AuthenticationError } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/auth_dev');
  console.log('connected to mongodb');

  const app = express();
  app.use(cookieParser());
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => {

      // check JWT
      const { jwt: token } = req.cookies;
      if (token) {
        const jwtSecret = process.env.JWT_SECRET || 'secret';
        try {
          const jwtPayload = jwt.verify(token, jwtSecret);
          const { iat, exp, ...user } = jwtPayload;
          return { req, res, user }; 
        } catch (err) {
          throw new AuthenticationError('Not authenticated');
        }
      }

      return { req, res }; 
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
    cors: {
      origin: [
        process.env.REACT_APP_ORIGIN || 'http://localhost:3000',
        'https://studio.apollographql.com'
      ],
      credentials: true
    }
  });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

main().catch(err => console.log(err));
