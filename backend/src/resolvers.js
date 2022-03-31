const MovieModel = require('./models/Movie');

const resolvers = {
  Query: {
    movies: async() => {
      return MovieModel.find({});
    },
  },
};

module.exports = resolvers;
