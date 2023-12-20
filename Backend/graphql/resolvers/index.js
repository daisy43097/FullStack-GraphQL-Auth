const usersResolver = require('./users');

module.exports = {
  Query: {
    ...usersResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
  }
};