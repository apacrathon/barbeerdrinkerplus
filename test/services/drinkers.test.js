const assert = require('assert');
const app = require('../../src/app');

describe('\'drinkers\' service', () => {
  it('registered the service', () => {
    const service = app.service('drinkers');

    assert.ok(service, 'Registered the service');
  });
});
