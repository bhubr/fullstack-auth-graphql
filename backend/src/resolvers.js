const { AuthenticationError } = require('apollo-server-core');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const MovieModel = require('./models/Movie');
const UserModel = require('./models/User');

const resolvers = {
  Query: {
    movies: async() => {
      return MovieModel.find({});
    },
    currentUser: async(parent, args, context) => {
      const { jwt: token } = context.req.cookies;
      if (!token) {
        throw new AuthenticationError('Not authenticated');
      }
      const jwtSecret = process.env.JWT_SECRET || 'secret';
      const jwtPayload = jwt.verify(token, jwtSecret);
      const { iat, exp, ...user } = jwtPayload;

      return user;
    }
  },
  Mutation: {
    login: async(parent, args, context) => {
      // 1. Récupérer user dans la BDD
      // si ça échoue => throw error
      const userDoc = await UserModel.findOne({ email: args.email });
      if (!userDoc) {
        throw new AuthenticationError('Bad credentials');
      }
      // spécifique à Mongoose
      const user = userDoc.toObject();
      
      // 2. Vérifier que le password (args.password, en clair)
      // correspond à user.password (chiffré)
      // si ça échoue => throw error
      const isPasswordValid = await bcrypt.compare(args.password, user.password);
      if (!isPasswordValid) {
        throw new AuthenticationError('Bad credentials');
      }

      // 3. Générer un JWT
      const { password, __v, ...payload } = user;
      const jwtSecret = process.env.JWT_SECRET || 'secret';
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      // 4. "Setter" un cookie sur la réponse
      context.res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000
      });

      // 5. Renvoyer objet correspondant au type GraphQL LoginResponse
      return {
        jwt: token,
        user: payload
      }
    }
  }
};

module.exports = resolvers;
