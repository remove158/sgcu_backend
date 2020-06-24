const db = require('./config/db');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize



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
channel.sync({ force: true }).then(() => {
// Now the `users` table in the database corresponds to the model definition
return  ;
//table.destroy({where:{}})

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
topic.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return  ;
    //table.destroy({where:{}})

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
idea.sync({ force: true }).then(() => {
// Now the `users` table in the database corresponds to the model definition
return  ;
//table.destroy({where:{}})

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
group.sync({ force: true }).then(() => {
// Now the `users` table in the database corresponds to the model definition
return  ;
//table.destroy({where:{}})

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
vote.sync({ force: true }).then(() => {
// Now the `users` table in the database corresponds to the model definition
return  ;
//table.destroy({where:{}})

});






