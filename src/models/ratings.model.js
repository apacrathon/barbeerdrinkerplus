'use strict';

// @TODO - Add foreign key constraints for barId and drinkerId

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const Bar = require('./bars.model');
const Drinker = require('./drinkers.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const ratings = sequelizeClient.define('ratings', {
    barId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('id');
      },
      set(barId) {
        this.setDataValue('id', barId);
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
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return ratings;
};
