const assert = require('assert');
const app = require('../../src/app');

describe('\'bartimes\' service', () => {
  it('registered the service', () => {
    const service = app.service('bartimes');

    assert.ok(service, 'Registered the service');
  });
});
