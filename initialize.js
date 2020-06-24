const db = require('./config/db');

(async () => {
  const { sequelize, channel, topic, idea, group, vote } = db;

  while (true) {
    try {
      console.log('Trying to connect to MySQL...')
      await sequelize.authenticate();
      break;
    } catch(ex) {
      await sleep(1000);
    }
  }

  await channel.sync({ force: true })
  await topic.sync({ force: true })
  await idea.sync({ force: true })
  await group.sync({ force: true })
  await vote.sync({ force: true })
})()

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
