// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const frequents = sequelizeClient.define('frequents', {
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

  frequents.associate = function (models) { // eslint-disable-line no-unused-vars
    frequents.belongsTo(models.drinkers, { foreignKey: 'drinkerId' });
    frequents.belongsTo(models.bars, { foreignKey: 'barId' });
  };
  frequents.sync({
    force:true
  });
  return frequents;
};
