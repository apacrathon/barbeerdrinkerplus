// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const Drinker = require('./drinkers.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const following = sequelizeClient.define('following', {
    drinkerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('drinkerId');
      },
      set(drinkerId) {
        this.setDataValue('drinkerId', drinkerId);
      },
      references: {
        model: Drinker(app),
        key: 'id'
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
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('followingId');
      },
      set(followingId) {
        this.setDataValue('followingId', followingId);
      },
      references: {
        model: Drinker(app),
        key: 'id'
      }
    },
    followingName: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('followingName');
      },
      set(followingName) {
        this.setDataValue('followingName', followingName);
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

  following.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return following;
};
