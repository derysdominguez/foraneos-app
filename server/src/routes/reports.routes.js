const { getIncomeAndExpensesReport, getFinancialSituationsReport } = require('../controllers/reports.controller')
const { Router } = require('express')
const router = Router()

router.get('/income-and-expenses', getIncomeAndExpensesReport)
router.get('/financial-situations', getFinancialSituationsReport)
module.exports = router
