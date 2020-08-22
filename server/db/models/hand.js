const Sequelize = require('sequelize')
const db = require('../db')

const Hand = db.define('hand', {
    renegged: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Hand