'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {foreignKey: 'categoryId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `all fields should not be empty`
        }
      }
    },
    img_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `all fields should not be empty`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `all fields should not be empty`
        },
        isInt: {
          args: true,
          msg: 'price should be in number format'
        },
        min: {
          args: [0],
          msg: 'price should not be less than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `all fields should not be empty`
        },
        isInt: {
          args: true,
          msg: 'stock should be in number format'
        },
        min: {
          args: [0],
          msg: 'stock should not be less than 0'
        }
      }
    },
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};