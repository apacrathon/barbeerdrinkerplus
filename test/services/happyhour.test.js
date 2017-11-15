const assert = require('assert');
const app = require('../../src/app');

describe('\'happyhour\' service', () => {
  it('registered the service', () => {
    const service = app.service('happyhour');

    assert.ok(service, 'Registered the service');
  });
});
