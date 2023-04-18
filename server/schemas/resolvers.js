const { Book, User } = require('../models');

const resolvers = {
  Query: {
    me: async () => {
      const userMe = await User.find({});
      return userMe;
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {

      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user with that email.');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password.');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      return user;
    },
    saveBook: async (parent, {bookInfo}) => {
    },
    removeBook: async (parent, {bookId}) => {

    }
  },
};

module.exports = resolvers;
