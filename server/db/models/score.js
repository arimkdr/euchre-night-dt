const Sequelize = require('sequelize')
const db = require('../db')

const Score = db.define('score', {
    points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = Score