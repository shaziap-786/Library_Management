'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  book.init({
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    state: DataTypes.STRING,
    genre_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
    timestamps: false
  });
  return book;
};