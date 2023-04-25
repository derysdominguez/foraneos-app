const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/User')

require('dotenv').config()

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
}

passport.use(
  'jwt',
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.getUserById({ id: payload.id })
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    } catch (error) {
      console.log(error)
    }
  })
)
