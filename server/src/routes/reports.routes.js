const { getIncomeAndExpensesReport } = require('../controllers/reports.controller')
const { Router } = require('express')
const router = Router()

router.get('/income-and-expenses', getIncomeAndExpensesReport)
module.exports = router
