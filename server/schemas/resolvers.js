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
