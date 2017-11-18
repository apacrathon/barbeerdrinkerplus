'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const bartimes = sequelizeClient.define('bartimes', {
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
    openTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([01]\d|2[0-3]):?([0-5]\d)$/   // 24 hour time regex
      },
      get() {
        return this.getDataValue('openTime');
      },
      set(openTime) {
        this.setDataValue('openTime', openTime);
      }
    },
    closeTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([01]\d|2[0-3]):?([0-5]\d)$/  // 24 hour time regex
      },
      get() {
        return this.getDataValue('closeTime');
      },
      set(closeTime) {
        this.setDataValue('closeTime', closeTime);
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

  bartimes.associate = function (models) { // eslint-disable-line no-unused-vars
    bartimes.belongsTo(models.bars, { foreignKey: 'barId' });
  };

  return bartimes;
};
