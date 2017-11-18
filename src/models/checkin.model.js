'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const checkin = sequelizeClient.define('checkin', {
    barId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
      primaryKey: true,
      get() {
        return this.getDataValue('drinkerId');
      },
      set(drinkerId) {
        this.setDataValue('drinkerId', drinkerId);
      }
    },
    drinkerName: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('drinkerName');
      },
      set(drinkerName) {
        this.setDataValue('drinkerName', drinkerName);
      }
    },
    checkInTime: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('checkInTime');
      },
      set(checkInTime) {
        this.setDataValue('checkInTime', checkInTime);
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

  checkin.associate = function (models) { // eslint-disable-line no-unused-vars
    checkin.belongsTo(models.drinkers, { foreignKey: 'drinkerId' });
    checkin.belongsTo(models.bars, { foreignKey: 'barId' });
  };

  return checkin;
};
