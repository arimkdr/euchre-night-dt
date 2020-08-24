const Sequelize = require('sequelize')
const db = require('../db')

const Player = db.define('player', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  gamesWon: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  gamesLost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Player
