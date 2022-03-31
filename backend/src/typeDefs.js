const { gql } = require('apollo-server-core');

const typeDefs = gql`
  type Review {
    _id: ID
    rating: Int
    comment: String
  }

  type Movie {
    _id: ID
    title: String
    picture: String
    releaseYear: Int
    reviews: [Review]
  }

  type User {
    _id: ID
    email: String
    role: String
  }

  type LoginResponse {
    jwt: String
    user: User
  }

  type Query {
    movies: [Movie]
  }

  type Mutation {
    login(email: String, password: String): LoginResponse
  }
`;

module.exports = typeDefs;
