'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookmark.init({
    URL: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    width: DataTypes.NUMBER,
    height: DataTypes.NUMBER,
    duration: DataTypes.NUMBER,
    keyWord: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bookmark',
    freezeTableName: true,
  });
  return bookmark;
};