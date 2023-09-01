'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    
    static associate({Group, Module}) {
      this.belongsTo(Group, { foreignKey: 'group_id' });
      this.belongsTo(Module, { foreignKey: 'module_id' });
    }
  }
  Task.init({
    group_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    module_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Modules',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};