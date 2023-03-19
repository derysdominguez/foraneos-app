const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/User')

require('dotenv').config()

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET_KEY

passport.use(
  'jwt',
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findOne({ where: { id: payload.id } })
      if (user) {
        done(null, user)
      }
      done(null, false)
    } catch (error) {
      console.log(error)
    }
  })
)
