const {expect} = require('chai')
const db = require('./index')
const Card = db.model('card')
const Game = db.model('game')
const Hand = db.model('hand')
const Player = db.model('player')
const Round = db.model('round')
const Score = db.model('score')
const Team = db.model('team')
const Trick = db.model('trick')

describe('Player model', () => {
  let testPlayer
  before(() => db.sync({force: true}))
  beforeEach(() => {
    testPlayer = {
      username: 'arimkdr',
      password: 'supersafe-password'
    }
  })
  after(() => db.sync({force: true}))
  it.only('Allows a player to be added with a username and protected password', async () => {
    const createdPlayer = await Player.create(testPlayer)
    expect(createdPlayer.username).to.equal('arimkdr')
    expect(createdPlayer.password()).to.not.equal('supersafe-password')
  })
})
