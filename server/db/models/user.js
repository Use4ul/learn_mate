'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Role, Group, GroupItem, Answer, Module }) {
      this.belongsTo(Role, { foreignKey: 'role_id' });
      this.hasMany(Group, { foreignKey: 'teacher_id' });
      this.hasMany(GroupItem, { foreignKey: 'student_id' });
      this.hasMany(Answer, { foreignKey: 'user_id' });
      this.hasMany(Module, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: DataTypes.TEXT,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      role_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
