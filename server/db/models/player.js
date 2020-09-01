const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const Player = db.define('player', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
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

Player.prototype.correctPassword = function(candidatePwd) {
  return Player.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
Player.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Player.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = player => {
  if (player.changed('password')) {
    player.salt = Player.generateSalt()
    player.password = Player.encryptPassword(player.password(), player.salt())
  }
}

Player.beforeCreate(setSaltAndPassword)
Player.beforeUpdate(setSaltAndPassword)
Player.beforeBulkCreate(players => {
  players.forEach(setSaltAndPassword)
})
