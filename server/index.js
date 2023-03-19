const express = require('express')
const morgan = require('morgan')
const passport = require('passport')

const sequelize = require('./src/database/database')
const indexRoutes = require('./src/routes/index.routes')

const app = express()
const PORT = process.env.PORT || 4001

// configs
require('./src/config/passport')

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(passport.initialize())

// routes
app.use('/api', indexRoutes)

// sequelize sync
sequelize.sync({ force: false }).then(() => {
  console.log('Database is connected')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
