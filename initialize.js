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

  await channel.sync()
  await topic.sync()
  await idea.sync()
  await group.sync()
  await vote.sync()
})()

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
