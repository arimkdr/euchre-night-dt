const router = require('express').Router()
const Player = require('../db/models/player')
const pick = require('lodash/pick')
const {v4: uuidv4} = require('uuid')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const player = await Player.findOne({where: {username: req.body.username}})
    if (!player) {
      console.log('No such user found:', req.body.username)
      res.status(401).send('Wrong username and/or password')
    } else if (!player.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.username)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(player, err => (err ? next(err) : res.json(player)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const filteredPlayer = pick(req.body, ['username', 'password'])
    console.log('filteredPlayer', filteredPlayer)
    const player = await Player.create(filteredPlayer)
    req.login(player, err => (err ? next(err) : res.json(player)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.player)
})

router.use('/google', require('./google'))
