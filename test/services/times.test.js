const assert = require('assert');
const app = require('../../src/app');

describe('\'times\' service', () => {
  it('registered the service', () => {
    const service = app.service('times');

    assert.ok(service, 'Registered the service');
  });
});
