const assert = require('assert');
const app = require('../../src/app');

describe('\'theaters\' service', () => {
  it('registered the service', () => {
    const service = app.service('theaters');

    assert.ok(service, 'Registered the service');
  });
});
