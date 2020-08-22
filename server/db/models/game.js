const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {})

module.exports = Game