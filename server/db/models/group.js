'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    
    static associate({User,GroupItem,Task}) {
      this.belongsTo(User, { foreignKey: 'teacher_id' });
      this.hasMany(GroupItem, { foreignKey: 'group_id' });
      this.hasMany(Task, { foreignKey: 'group_id' });
      
    }
  }
  Group.init({
    teacher_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};