const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const passport = require('passport')

const indexRoutes = require('./src/routes/index.routes')

const app = express()
const PORT = process.env.PORT || 4001

// configs
require('./src/config/passport')
const sequelize = require('./src/database/database')

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(passport.initialize())

// routes
app.use('/api', indexRoutes)

// front-end
app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

sequelize.sync({ force: false }).then(() => {
  console.log('Database is connected')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
