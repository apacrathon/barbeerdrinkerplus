'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const drink = sequelizeClient.define('drink', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      get() {
        this.getDataValue('id');
      },
      set(id) {
        this.setDataValue('id', id);
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      get() {
        this.getDataValue('name');
      },
      set(name) {
        this.setDataValue('name', name);
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        this.getDataValue('type');
      },
      set(type) {
        this.setDataValue('type', type);
      }
    }
  }, {
    timestamps: false
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
});

  drink.associate = function (models) { // eslint-disable-line no-unused-vars
  };

  return drink;
};
