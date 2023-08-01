const sequelize=require('../util/database');
const Sequelize=require('sequelize');
const Expense=sequelize.define('expense',{
id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
},
amount:{
    type:Sequelize.INTEGER,
    allowNull:false,
   
},
desc:{
    type:Sequelize.STRING,
    allowNull:false,
   
},
category:{
    type:Sequelize.STRING,
    allowNull:false
}
})
module.exports=Expense;