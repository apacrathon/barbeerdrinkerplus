const assert = require('assert');
const app = require('../../src/app');

describe('\'drink\' service', () => {
  it('registered the service', () => {
    const service = app.service('drink');

    assert.ok(service, 'Registered the service');
  });
});
