// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const Drink = require('./drink.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const likes = sequelizeClient.define('likes', {
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
    drinkName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('drinkName');
      },
      set(drinkName) {
        this.setDataValue('drinkName', drinkName);
      },
      references: {
        model: Drink(app),
        key: 'name'
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

  likes.associate = function (models) { // eslint-disable-line no-unused-vars
    likes.belongsTo(models.drinkers, { foreignKey: 'drinkerId' });
  };

  return likes;
};
