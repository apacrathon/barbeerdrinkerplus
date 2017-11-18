const assert = require('assert');
const app = require('../../src/app');

describe('\'checkin\' service', () => {
  it('registered the service', () => {
    const service = app.service('checkin');

    assert.ok(service, 'Registered the service');
  });
});
