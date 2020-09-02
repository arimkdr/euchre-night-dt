const Sequelize = require('sequelize')
const db = require('../db')

const Trick = db.define('trick', {
  leadingSuit: {
    type: Sequelize.ENUM,
    values: ['spades', 'diamonds', 'clubs', 'hearts']
  }
})

module.exports = Trick
