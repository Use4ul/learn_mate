'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupItem extends Model {
    
    static associate({User,Group}) {
      this.belongsTo(User, { foreignKey: 'student_id' });
      this.belongsTo(Group, { foreignKey: 'group_id' });
    }
  }
  GroupItem.init({
    student_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'GroupItem',
  });
  return GroupItem;
};