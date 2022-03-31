const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/auth_dev');
  console.log('connected to mongodb');

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ res }) => ({ res })
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
  });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

main().catch(err => console.log(err));
