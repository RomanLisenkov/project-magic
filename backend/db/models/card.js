'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // this.belongsToMany(models.User, {
      //   foreignKey: 'card_id',
      //   through: 'Baskets',
      //   as: 'cards',
      // });

      this.belongsTo(models.User, { foreignKey: 'user_id' });

      this.hasMany(models.Basket, { foreignKey: 'card_id' });
    }
  }
  Card.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      image: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      condition: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Card',
    }
  );
  return Card;
};
