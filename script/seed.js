const db = require('../server/db')
const {Card} = require('../server/db/models')

const cards = []

const suits = ['spades', 'diamonds', 'clubs', 'hearts']

for (let i = 9; i <= 14; i++) {
  for (let j = 0; j < 4; j++) {
    cards.push({
      value: i,
      suit: suits[j],
      threePlayer: i !== 9
    })
  }
}

async function seed() {
  await db.sync({force: true})

  const seedCards = async () => {
    await Promise.all(cards.map(card => Card.create(card)))
  }

  await seedCards()
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed
