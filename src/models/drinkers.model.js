'use strict';

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
      },
      validate :{
        valididateGender(value) {
          const valueLower = value.toLowerCase();
          if (!(valueLower == "1" || valueLower == "0" || valueLower == "-1")) {
            throw new Error ("Unknown gender value specified.");
          }
        }
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
      },
      validate: {
        validAge(value) {
          if (value < 21) {
            throw new Error('You must be at least 21 years old! It\'s the law!');
          } else if (value > 120) {
            throw new Error('Sorry, an age greater than 120 seems unrealistic nowadays. We will change this constraint when medicine has further advanced.');
          } else if (!Number.isInteger(value)) {
            throw new Error('Age must be an integer.')
          }
        },
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
        validZipRegExp(value) {
          if (!(/^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/.test(value))) {
            throw new Error('Not a valid zip code');
          }
        }
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
      timestamps: false
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  drinkers.associate = function (models) { // eslint-disable-line no-unused-vars
    drinkers.hasMany(models.frequents, { foreignKey: 'drinkerId' });
    drinkers.hasMany(models.checkin, { foreignKey: 'drinkerId' });
    drinkers.hasMany(models.likes, { foreignKey: 'drinkerId' });
    drinkers.hasMany(models.ratings, { foreignKey: 'drinkerId' });
  };

  return drinkers;
};
