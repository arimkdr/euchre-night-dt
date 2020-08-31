const router = require('express').Router()
const {Player} = require('../db/models')
const pick = require('lodash/pick')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(players)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const filteredPlayer = pick(req.body, ['username'])
    const newPlayer = await Player.create(filteredPlayer)
    res.send(newPlayer)
  } catch (err) {
    next(err)
  }
})
