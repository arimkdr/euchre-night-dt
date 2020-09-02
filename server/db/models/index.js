const Card = require('./card')
const Game = require('./game')
const Hand = require('./hand')
const Player = require('./player')
const Round = require('./round')
const Score = require('./score')
const Team = require('./team')
const Trick = require('./trick')
const {ReactReduxContext} = require('react-redux')

Game.hasMany(Round)
Game.belongsTo(Team, {as: 'winner'})
Game.belongsTo(Team, {as: 'loser'})

Game.belongsToMany(Team, {through: Score})
Team.belongsToMany(Game, {through: Score})

Hand.belongsToMany(Card, {through: 'hand_card'})
Card.belongsToMany(Hand, {through: 'hand_card'})

Hand.belongsTo(Round)
Player.hasMany(Hand)

Player.belongsToMany(Team, {through: 'team_player'})
Team.belongsToMany(Player, {through: 'team_player'})
Player.belongsToMany(Round, {through: 'gone_alone'})
Round.belongsToMany(Player, {through: 'gone_alone'})
Round.belongsTo(Player, {as: 'dealer'})
Trick.belongsTo(Player, {as: 'winner'})

Round.belongsTo(Team, {as: 'trumpCaller'})
Round.hasMany(Trick)

Round.belongsTo(Card, {as: 'right'})
Round.belongsTo(Card, {as: 'left'})

module.exports = {
  Card,
  Game,
  Hand,
  Player,
  Round,
  Team,
  Trick
}
