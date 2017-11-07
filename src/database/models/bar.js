const Sequelize = require('sequelize');
const sequelize = require('../../testdrive.js').sequelize();

const Bar = sequelize.define('bar', {
  id: {
    type: Sequelize.INTEGER,
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
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('name');
    },
    set(name) {
      this.setDataValue('name', name);
    }
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('street');
    },
    set(street) {
      this.setDataValue('street', street);
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('city');
    },
    set(city) {
      this.setDataValue('city', city);
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('state');
    },
    set(state) {
      this.setDataValue('state', state);
    }
  },
  zipcode: {
    type: Sequelize.INTEGER(5).ZEROFILL,
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
    type: Sequelize.INTEGER,
    allowNull: false,
    get() {
      return this.getDataValue('capacity');
    },
    set(capacity) {
      this.setDataValue('capacity', capacity);
    }
  },
  attire: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('attire');
    },
    set(attire) {
      this.setDataValue('attire', attire);
    }
  },
  acceptsCredit: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    get() {
      return this.getDataValue('acceptsCredit');
    },
    set(acceptsCredit) {
      this.setDataValue('acceptsCredit', acceptsCredit);
    }
  },
  isGoodForGroups: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    get() {
      return this.getDataValue('isGoodForGroups');
    },
    set(isGoodForGroups) {
      this.setDataValue('isGoodForGroups', isGoodForGroups);
    }
  },
  hasWiFi: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    get() {
      return this.getDataValue('hasWiFi');
    },
    set(hasWiFi) {
      this.setDataValue('hasWiFi', hasWiFi);
    }
  },
  allowsSmoking: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    get() {
      return this.getDataValue('allowsSmoking');
    },
    set(allowsSmoking) {
      this.setDataValue('allowsSmoking', allowsSmoking);
    }
  },
  typicalCrowd: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('typicalCrowd');
    },
    set(typicalCrowd) {
      this.setDataValue('typicalCrowd', typicalCrowd);
    }
  }
},
  {
    timestamps: false
  }
);

module.exports = Bar;
