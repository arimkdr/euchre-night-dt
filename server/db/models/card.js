const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
    value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 9,
            max: 14
        }
    },
    suit: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['spades', 'diamonds', 'clubs', 'hearts']
    },
    threePlayer: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
})

module.exports = Card