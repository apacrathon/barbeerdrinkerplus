// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const sells = sequelizeClient.define('sells', {
    barId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('barId');
      },
      set(barId) {
        this.serDataValue('barId', barId);
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
    drinkName: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('drinkName');
      },
      set(drinkName) {
        this.setDataValue('drinkName', drinkName);
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      get() {
        return this.getDataValue('price');
      },
      set(price){
        this.setDataValue('price', price);
      }
    },
    happyHourPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      get() {
        return this.getDataValue('price');
      },
      set(happyHourPrice) {
        this.setDataValue('happyHourPrice', happyHourPrice);
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

  sells.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return sells;
};
