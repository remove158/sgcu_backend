const Sequelize = require("sequelize")

const dbHost = process.env.MYSQL_HOST || 'localhost'
const dbName = process.env.MYSQL_DATABASE || 'sgcu'
const dbUser = process.env.MYSQL_USER || 'root'
const dbPass = process.env.MYSQL_PASS || ''

const sequelize  = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect:'mysql' ,
  define: {
    freezeTableName: true,
  }
  
});


const channel = sequelize.define('channel', {
  // attributes

  channel_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  channel_key: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  timestamps: false,

});


const topic = sequelize.define(`topic`, {
  // attributes

  topic_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  topic: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
  },win_group_title: {
    type: Sequelize.STRING,
    // allowNull defaults to true
  },
  createdAt:{
    type:Sequelize.DATE
  },
  updatedAt:{
    type:Sequelize.DATE
  },
  channel_id:{
    type:Sequelize.INTEGER,
    allowNull: false
  },

}, {
  define: {
    timestamps: true,
    freezeTableName: true
  }
});

topic.belongsTo(channel, {
  foreignKey: 'channel_id',
});


const idea = sequelize.define('idea', {
  // attributes

  idea_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idea: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idea_group_id: {
    type: Sequelize.INTEGER,
    // allowNull defaults to true
  },
  topic_id: {
      type: Sequelize.INTEGER,
      allowNull:false
      // allowNull defaults to true
    },
  user_name:{
      type: Sequelize.STRING,
      allowNull:false
  },
}, {
  timestamps: false,
});


const group = sequelize.define('group', {
  // attributes

  group_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  group: {
    type: Sequelize.STRING,
    allowNull: false
  },
  topic_id: {
      type: Sequelize.INTEGER,
      allowNull:false
      // allowNull defaults to true
    },    
}, {
  timestamps: false,

});


const vote = sequelize.define('vote', {
  // attributes
  vote_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  group_id: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  topic_id: {
      type: Sequelize.INTEGER,
      allowNull:false
      // allowNull defaults to true
    },    
}, {
  
  timestamps: false,

});


const checkPermission= async (channel_key,topic_id)=>{


  const topics = await topic.findOne({ where: { topic_id }, include: channel })

  
  if(topics != null){
    // console.log(topics.dataValues.channel.dataValues.channel_key,channel_key);
    return  topics.dataValues.channel.dataValues.channel_key === channel_key || false;
  } return false;

 
}


module.exports = {Sequelize,sequelize,channel,vote,idea,topic,group,channel,checkPermission};