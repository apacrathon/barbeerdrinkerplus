'use strict';

// @TODO - Add foreign key constraints for barId and drinkerId

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const Bar = require('./bars.model');
const Drinker = require('./drinkers.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const ratings = sequelizeClient.define('ratings', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      get() {
        return this.getDataValue('id');
      },
      set(id) {
        this.setDataValue('id', id);
      }
    },
    barId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('barId');
      },
      set(barId) {
        this.setDataValue('barId', barId);
      }
    },
    barName: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('barName');
      },
      set(barName) {
        this.setDataValue('barName', barName);
      }
    },
    drinkerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('drinkerId');
      },
      set(drinkerId) {
        this.setDataValue('drinkerId', drinkerId);
      }
    },
    rating: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      get() {
        return this.getDataValue('rating');
      },
      set(rating) {
        this.setDataValue('rating', rating);
      },
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    timestamps: true,
    updatedAt: false,
    deletedAt: false,
    createdAt: 'dateTime'
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  ratings.associate = function (models) { // eslint-disable-line no-unused-vars
    ratings.belongsTo(models.bars, { foreignKey: 'barId' });
    ratings.belongsTo(models.drinkers, { foreignKey: 'drinkerId' });
  };

  return ratings;
};
