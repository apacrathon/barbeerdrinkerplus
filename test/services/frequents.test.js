const assert = require('assert');
const app = require('../../src/app');

describe('\'frequents\' service', () => {
  it('registered the service', () => {
    const service = app.service('frequents');

    assert.ok(service, 'Registered the service');
  });
});
