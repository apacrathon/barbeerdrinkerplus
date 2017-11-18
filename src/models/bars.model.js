// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const bars = sequelizeClient.define('bars', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      get() {
        return this.getDataValue('id');
      },
      set(barId) {
        this.setDataValue('id', barId);
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('name');
      },
      set(name) {
        this.setDataValue('name', name);
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('street');
      },
      set(street) {
        this.setDataValue('street', street);
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('city');
      },
      set(city) {
        this.setDataValue('city', city);
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('state');
      },
      set(state) {
        this.setDataValue('state', state);
      }
    },
    zipcode: {
      type: DataTypes.INTEGER(5).ZEROFILL,
      validate: {
        len: [5, 5]
      },
      allowNull: false,
      get() {
        return this.getDataValue('zipcode');
      },
      set(zipcode) {
        this.setDataValue('zipcode', zipcode);
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('capacity');
      },
      set(capacity) {
        this.setDataValue('capacity', capacity);
      }
    },
    attire: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('attire');
      },
      set(attire) {
        this.setDataValue('attire', attire);
      }
    },
    acceptsCredit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      get() {
        return this.getDataValue('acceptsCredit');
      },
      set(acceptsCredit) {
        this.setDataValue('acceptsCredit', acceptsCredit);
      }
    },
    isGoodForGroups: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      get() {
        return this.getDataValue('isGoodForGroups');
      },
      set(isGoodForGroups) {
        this.setDataValue('isGoodForGroups', isGoodForGroups);
      }
    },
    hasWiFi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      get() {
        return this.getDataValue('hasWiFi');
      },
      set(hasWiFi) {
        this.setDataValue('hasWiFi', hasWiFi);
      }
    },
    allowsSmoking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      get() {
        return this.getDataValue('allowsSmoking');
      },
      set(allowsSmoking) {
        this.setDataValue('allowsSmoking', allowsSmoking);
      }
    },
    typicalCrowd: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('typicalCrowd');
      },
      set(typicalCrowd) {
        this.setDataValue('typicalCrowd', typicalCrowd);
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

  bars.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    bars.hasOne(models.happyhour, { foreignKey: 'barId' });
    bars.hasMany(models.frequents, { foreignKey: 'barId' });
    bars.hasMany(models.checkin, { foreignKey: 'barId' });
  };
  bars.sync({
    force: false
  });
  return bars;
};
