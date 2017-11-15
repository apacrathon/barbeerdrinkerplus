'use strict';

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

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
      type: 'VARBINARY(7)',
      allowNull: false,
      validate: {
        min: 0b0000000,
        max: 0b1111111,
        // @TODO - Validate day input as a binary value.
      },
      get() {
        return this.getDataValue('day');
      },
      set(day) {
        this.setDataValue('day', day);
      }
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      // @TODO - restrict only to time.
      get() {
        return this.getDataValue('startTime');
      },
      set(startTime) {
        this.setDataValue('startTime', startTime);
      }
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      // @TODO - restrict only to time.
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

  happyhour.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };
  happyhour.sync({force: true});
  return happyhour;
};
