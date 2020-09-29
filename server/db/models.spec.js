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

  it('Allows a player to be created with a username and protected password', async () => {
    const createdPlayer = await Player.create(testPlayer)
    expect(createdPlayer.username).to.equal('arimkdr')
    expect(createdPlayer.password()).to.not.equal('supersafe-password')
  })
})

describe('Team model', () => {
  let testPlayer1
  let testPlayer2
  let testTeam
  before(() => db.sync({force: true}))
  beforeEach(() => {
    testPlayer1 = {
      username: 'arimkdr',
      password: 'supersafe-password'
    }
    testPlayer2 = {
      username: 'dalinim',
      password: 'unhackable-password'
    }
    testTeam = {
      name: 'Habibis'
    }
  })
  after(() => db.sync({force: true}))

  it('Allows a team to be created with a name', async () => {
    const createdTeam = await Team.create(testTeam)
    expect(createdTeam.name).to.equal('Habibis')
  })

  it('Allows players to be added to a team', async () => {
    const createdTeam = await Team.create(testTeam)
    const createdPlayer1 = await Player.create(testPlayer1)
    const createdPlayer2 = await Player.create(testPlayer2)
    await createdTeam.addPlayer(createdPlayer1)
    await createdTeam.addPlayer(createdPlayer2)
    const teamPlayers = await createdTeam.getPlayers()
    expect(teamPlayers).to.have.lengthOf(2)
    expect(teamPlayers.map(player => player.username)).to.include('arimkdr')
    expect(teamPlayers.map(player => player.username)).to.include('dalinim')
  })
})
