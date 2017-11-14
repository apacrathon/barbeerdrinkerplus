const assert = require('assert');
const app = require('../../src/app');

describe('\'sells\' service', () => {
  it('registered the service', () => {
    const service = app.service('sells');

    assert.ok(service, 'Registered the service');
  });
});
