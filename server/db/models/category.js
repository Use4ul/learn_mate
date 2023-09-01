'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    
    static associate({Module}) {
      this.hasMany(Module, { foreignKey: 'category_id' });
    }
  }
  Category.init({
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};