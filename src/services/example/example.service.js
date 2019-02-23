// Initializes the `example` service on path `/example`
const createService = require('feathers-mongoose');
const createModel = require('../../models/example.model');
const hooks = require('./example.hooks');
const filters = require('./example.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'example',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/example', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('example');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
