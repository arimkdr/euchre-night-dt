const Sequelize = require('sequelize')
const db = require('../db')

const Round = db.define('round', {
    trump: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['spades', 'diamonds', 'clubs', 'hearts']
    }
})

module.exports = Round