// income and expenses report
const Entry = require('../models/Entry')
const EntryDetail = require('../models/EntryDetail')
const Account = require('../models/Account')
const Student = require('../models/Student')
const MonthlyPayment = require('../models/MonthlyPayment')

const { Op } = require('sequelize')

const getIncomeAndExpensesReport = async (req, res) => {
  try {
    const entries = await EntryDetail.findAll({
      where: {
        [Op.or]: [{ lado: 'D' }, { lado: 'H' }]
      },
      include: [
        {
          model: Entry,
          attributes: ['fecha', 'descripcion']
        },
        {
          model: Account,
          attributes: ['nombre', 'clasificacion', 'naturaleza', 'entrada', 'tipo_cuenta']
        }
      ]
    })
    res.status(200).json(entries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getDebtsReport = async (req, res) => {
  try {
    const entries = await Entry.findAll({
      include: {
        model: EntryDetail,
        include: {
          model: Account,
          where: {
            [Op.or]: [{ clasificacion: 'deuda' }]
          }
        }
      }
    })
    res.json(entries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getFinancialSituationsReport = async (req, res) => {
  try {
    const entries = await Entry.findAll({
      include: {
        model: EntryDetail,
        include: {
          model: Account
        }
      }
    })
    res.json(entries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMonthlyPaymentsByGrade = async (req, res) => {
  try {
    const monthlyPayments = await MonthlyPayment.findAll({
      where: {},
      include: {
        model: Student
      }
    })
    res.json(monthlyPayments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = {
  getIncomeAndExpensesReport,
  getDebtsReport,
  getFinancialSituationsReport,
  getMonthlyPaymentsByGrade
}
