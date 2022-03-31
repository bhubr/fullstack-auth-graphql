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

  type Query {
    movies: [Movie]
  }
`;

module.exports = typeDefs;
