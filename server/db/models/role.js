'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    
    static associate({User}) {
      this.hasMany(User, { foreignKey: 'role_id' });
    }
  }
  Role.init({
     title: {
        allowNull: false,
        type: DataTypes.TEXT
      },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};