'use strict';
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const drinkers = sequelizeClient.define('drinkers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      get() {
        return this.getDataValue('id');
      },
      set(drinkerId) {
        this.setDataValue('id', drinkerId);
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('name');
      },
      set(drinkerName) {
        this.setDataValue('name', drinkerName);
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('gender');
      },
      set(drinkerGender) {
        this.setDataValue('gender', drinkerGender);
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('age');
      },
      set(drinkerAge) {
        this.setDataValue('age', drinkerAge);
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('city');
      },
      set(drinkerCity) {
        this.setDataValue('city', drinkerCity);
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('state');
      },
      set(drinkerState) {
        this.setDataValue('state', drinkerState);
      }
    },
    zipcode: {
      type: DataTypes.INTEGER(5).ZEROFILL,
      validate: {
        len: [5, 5]
      },
      allowNull: false,
      get() {
        return this.getDataValue('zipcode');
      },
      set(zipcode) {
        this.setDataValue('zipcode', zipcode);
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  drinkers.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return drinkers;
};
