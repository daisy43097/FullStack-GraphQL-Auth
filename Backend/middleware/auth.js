const {AuthenticationError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const {JWT_STRING} = require("../const");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer')[1];

    if (token) {
      try {
        const user = jwt.verify(
          token,
          JWT_STRING,
        );
        return user;
      } catch (e) {
        throw new AuthenticationError('Invalid/Expired Token');
      }
    }
    throw new Error('Authentication token must be "Bearer [token]"');
  }
  throw new Error('Authorization header must be provided');
};