const Sequelize = require("sequelize")



const sequelize  = new Sequelize('sgcu', 'root', '', {
  host: 'localhost',
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
  },win_group_id: {
    type: Sequelize.INTEGER,
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




module.exports = {Sequelize,sequelize,channel,vote,idea,topic,group,channel};