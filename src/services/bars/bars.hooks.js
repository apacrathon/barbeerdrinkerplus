'use strict';

const { authenticate } = require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [ /*authenticate('jwt')*/ ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      function(hook) {
        if (hook.params.provider == 'rest') { throw new Error('You cannot delete a bar via REST'); }
      }
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
