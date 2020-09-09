/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Player = db.model('player')

describe('Player routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/players/', () => {
    const testPlayer = 'test-player'

    beforeEach(() => {
      return Player.create({
        username: 'test-player',
        password: 'test_password'
      })
    })

    it('GET /api/players', async () => {
      const res = await request(app)
        .get('/api/players')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].username).to.be.equal(testPlayer)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
