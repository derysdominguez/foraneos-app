const express = require('express')
const morgan = require('morgan')

const sequelize = require('./src/database/database')
const indexRoutes = require('./src/routes/index.routes')

const app = express()
const PORT = process.env.PORT || 4001

// middleware
app.use(morgan('dev'))

// routes
app.use('/api', indexRoutes)

// sequelize sync
sequelize.sync({ force: false }).then(() => {
  console.log('Database is connected')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
