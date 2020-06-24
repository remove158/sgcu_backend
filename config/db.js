const Sequelize = require("sequelize");
const mysql = require("mysql")
const Model = Sequelize.Model;



const sequelize  = new Sequelize('sgcu', 'root', '', {
  host: 'localhost',
  dialect:'mysql' ,
  define: {
    timestamps: false,
    freezeTableName: true
  }
  
});

var mysql_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sgcu_test"
});


const addChannel = (channel_key,title)=>{
  
  const User = sequelize.define('channel', {
    // attributes

    channel_id: {
      type: Sequelize.INTEGER,
      primaryKey: true

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
    // options
  });
  User.create({channel_key:channel_key,title:title}).then( res=> {return res});

}


module.exports = {addChannel:addChannel,con:mysql_con};