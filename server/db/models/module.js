'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
   
    static associate({User,Card, Task, Category}) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Category, { foreignKey: 'category_id' });
      this.hasMany(Card, { foreignKey: 'module_id' });
      this.hasMany(Task, { foreignKey: 'module_id' });
    }
  }
  Module.init({
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Categoties',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Module',
  });
  return Module;
};