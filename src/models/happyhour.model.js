'use strict';

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const Bars = require('./bars.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const happyhour = sequelizeClient.define('happyhour', {
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
    day: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('day');
      },
      set(day) {
        this.setDataValue('day', day);
      },
      validate: {
        is: /^[01]+$/, // Binary regex
        len: [7,7]
      }
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([01]\d|2[0-3]):?([0-5]\d)$/   // 24 hour time regex
      },
      get() {
        return this.getDataValue('startTime');
      },
      set(startTime) {
        this.setDataValue('startTime', startTime);
      }
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([01]\d|2[0-3]):?([0-5]\d)$/  // 24 hour time regex
      },
      get() {
        return this.getDataValue('endTime');
      },
      set(endTime) {
        this.setDataValue('endTime', endTime);
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

  happyhour.associate = function (models) {
    happyhour.belongsTo(models.bars, {foreignKey: 'barId'});
  };

  return happyhour;
};
