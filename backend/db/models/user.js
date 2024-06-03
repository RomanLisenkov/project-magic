'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // this.belongsToMany(models.Card, {
      //   foreignKey: 'user_id',
      //   through: 'Baskets',
      //   as: 'users',
      // });


      this.hasMany(models.Card, { foreignKey: 'user_id' });

      this.hasMany(models.Basket, { foreignKey: 'user_id' });
    };
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
