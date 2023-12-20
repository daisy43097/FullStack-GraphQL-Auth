const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_STRING} = require("../../const");

module.exports = {
  Mutation: {
    async registerUser(_, {registerInput: {username, email, password}}) {
      console.log(`username: ${username}`);

      // check if email already exists
      const oldUser = await User.findOne({ email });

      // throw error if existed
      if (oldUser) {
        throw new ApolloError(`A user is already registered with the email ${email}`, 'USER_ALREADY_EXISTED');
      }

      // hash password
      const hashPassword = await bcrypt.hash(password, 10);

      // build mongoose model
      let newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: hashPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // create JWT and attach to User model
      const token = jwt.sign(
        {user_id: newUser._id, email},
        JWT_STRING,
        {
          expiresIn: '2h',
        }
      );
      newUser.token = token;

      // save user to db
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      }
    },
    async loginUser(_, {loginInput: {email, password}}) {
      // check if email exists
      const user = await User.findOne({email});

      // check if password == hashPassword
      if (user && (await bcrypt.compare(password, user.password))) {
        // create new token
        const token = jwt.sign(
          {user_id: user._id, email},
          JWT_STRING,
          {
            expiresIn: '2h',
          }
        );

        // attach token to user model
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        }
      }

      // throw error if email does not exist
      throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
    },
  },
  Query: {
    user: (_, {ID}) => User.findById(ID)
  },
}