const Sequelize = require("sequelize")



const sequelize  = new Sequelize('sgcu', 'root', '', {
  host: 'localhost',
  dialect:'mysql' ,
  define: {
    freezeTableName: true,
  }
  
});



module.exports = {Sequelize,sequelize};